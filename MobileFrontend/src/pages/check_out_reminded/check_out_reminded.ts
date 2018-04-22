import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {ConfigService} from '../../app/config.service';
import {User, UserService} from '../../app/user.service';

@Component({selector: 'page-check-out', templateUrl: 'check_out_reminded.html'})
export class CheckOutReminded {
  checkoutTime: string;
  feedback: string;
  

  constructor(
      public navCtrl: NavController, public configService: ConfigService,
      public userService: UserService) {}

  onCheckOutClick() {
    this.postCheckoutReminded(this.checkoutTime).then(()=>{
      console.log('checked out?');
    });
  }

  postCheckoutReminded(checkoutTime: string){
    return new Promise((resolve, reject) => {
    
      // the config will determine which endpoint to use
      const apiEndpoint = this.configService.getEndpointUrl();

      const verificationForm = {
        'checkoutTime': checkoutTime,
        'uid': this.userService.getUser().id
      }

      const formBody: string = this.configService.xwwwurlencode(verificationForm);
      // make the HTTPRequest
      // see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
      fetch(`${apiEndpoint}update_checkout_reminded`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
      })

      // convert the blob request and JSON parse it asynchronously
      .then((blob) => blob.text())

      .then((text) => {
        // the id provided is valid - set the current user of the app to use
        // this id
        
        this.feedback = text;
        resolve(true);
      })
      // handle HTTP errors
      .catch((err) => {
        console.error(err);

        // if the response we get from the server is not valid json,
        // our attempt to JSON parse it above throws a SyntaxError
        // we always get invalid JSON when the ID is invalid
        // if (err.name === 'SyntaxError') {
        //   this.errorMessage = 'Invalid Phone Number';
        // }
        resolve(false);
      });
    });
  }
}
