module.exports = function(app, dbconn){
	// The parameters must be named 'checkoutTime' & 'uid'
    app.post('/update_checkout_reminded', function(req, res) {
        dbconn().then((db) => {
            // check if the user id exists
            existenceCheck = db.collection('bowls').find(
                {
                    'volunteers.id': parseInt(req.body.uid)
                },
                {
                    'volunteers.$': 1
                }
            ).toArray(function(err, items) {
                if (items.length > 0) {
                    const volunteer = items[0].volunteers[0];
                    // check that the user has checked in, but has not checked out
	                if (
                        volunteer.checkin &&
                        volunteer.checkin > 0 &&
                        volunteer.checkout == false
                    ) {
                        const [checkout_hour, checkout_minute] = req.body.checkoutTime.split(':');
                        const checkinTime = new Date(volunteer.checkin);
                        const checkin_hour = checkinTime.getHours();
                        const checkin_minute = checkinTime.getMinutes();

                        // start based on whatever the checkin time was
                        let checkoutTime = new Date(volunteer.checkin);

                        // edge case: the volunteer was volunteering past midnight
                        if(checkout_hour < checkin_hour){
                            // try rolling the checkoutTime over to the next day
                            checkoutTime.setDate(checkinTime.getDate() + 1);
                        }

                        // adjust the time to be correct
                        checkoutTime.setHours(checkout_hour);
                        checkoutTime.setMinutes(checkout_minute);

                        // edge case: past midnight AND it was the last day of the month
                        if(checkinTime.getTime() > checkoutTime.getTime()){
                            // roll over the checkouttime to the next month
                            checkoutTime.setMonth(checkoutTime.getMonth() + 1);
                        }

                        // edge case: past midnight AND last day of month AND last day of the year
                        // some kind soul was volunteering on new year's eve
                        if(checkinTime.getTime() > checkoutTime.getTime()){
                            // roll the year over
                            checkoutTime.setFullYear(checkoutTime.getFullYear() + 1);
                        }


	                    db.collection('bowls').update(
                            {
                                'volunteers.id': parseInt(req.body.uid)
                            },
	                        {
                                $set: {
                                    'volunteers.$.checkout': checkoutTime.getTime(),
                                },
	                        }
                        );
	                    res.send('Successfully Checked Out');   
                    } else {
                        res.status(400);
	                    res.send('Error: You have already checked out!');
                    }
                } else {
                    res.status(400);
                    res.send('Error: Incorrect UID or exit code.');
                }
                db.close();
            });
            
        });
    });
}