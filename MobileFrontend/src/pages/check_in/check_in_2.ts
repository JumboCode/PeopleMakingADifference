import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {ConfigService} from '../../app/config.service';
import {UserService} from '../../app/user.service';
import {MainPage} from '../main/main';

@Component({selector: 'page-check-in-2', templateUrl: 'check_in_2.html'})
export class CheckIn2 {
  personName: string;
  errorMessage: string;
  responseCode: string;

  constructor(
    public navCtrl: NavController, public userService: UserService, public configService: ConfigService) {
    this.personName = userService.getUser().name;
  }

  onSubmitClick() {
    // clear the error message, if there is one
    this.errorMessage = '';
    this.verifyCode(this.responseCode)
    .then(verified => {
      if(verified) {
        // log the user in automagically from now on
        this.userService.saveUser();
        this.navCtrl.push(MainPage);
      } else {
        this.errorMessage = "Incorrect verification code."
      }
    })
    // this.navCtrl.push(MainPage);
    // console.log(this.responseCode);
  }

  verifyCode(responseCode: string): Promise<boolean> {
    return new Promise((resolve, reject) => {


      // the config will determine which endpoint to use
      const apiEndpoint = this.configService.getEndpointUrl();

      const verificationForm = {
        'verif_code': this.responseCode,
        'uid': this.userService.getUser().id
      }

      const formBody: string = this.configService.xwwwurlencode(verificationForm);
      // make the HTTPRequest
      // see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
      fetch(`${apiEndpoint}verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
      })

      // convert the blob request and JSON parse it asynchronously
      .then((blob) => blob.json())

      .then((json) => {
        // the id provided is valid - set the current user of the app to use
        // this id
        

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
