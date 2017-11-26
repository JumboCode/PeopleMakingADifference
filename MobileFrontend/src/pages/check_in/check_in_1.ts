import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {ConfigService} from '../../app/config.service';
import {User, UserService} from '../../app/user.service';
import {MainPage} from '../main/main';

@Component({selector: 'page-check-in-1', templateUrl: 'check_in_1.html'})
export class CheckIn1 {
  personId: number;
  errorMessage = '';

  constructor(
      public navCtrl: NavController, public configService: ConfigService,
      public userService: UserService) {}

  checkID(id: number) {
    // clear the error message, if there is one
    this.errorMessage = '';

    // the config will determine which endpoint to use
    const apiEndpoint = this.configService.getEndpointUrl();

    // make the HTTPRequest
    // see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
    fetch(`${apiEndpoint}uid/${String(id)}`)

        // convert the blob request and JSON parse it asynchronously
        .then((blob) => blob.json())

        .then((json) => {
          // the id provided is valid - set the current user of the app to use
          // this id
          this.userService.setUser(new User(id));

          // navigate to the main page
          this.navCtrl.push(MainPage);
        })
        // handle HTTP errors
        .catch((err) => {
          console.error(err);
          console.error('Try turning on CORS or switching DEV_MODE');

          // if the response we get from the server is not valid json,
          // our attempt to JSON parse it above throws a SyntaxError
          // we always get invalid JSON when the ID is invalid
          if (err.name === 'SyntaxError') {
            this.errorMessage = 'Invalid ID';
          }
        });
  }

  onSubmitClick() {
    this.checkID(this.personId);
  }
}
