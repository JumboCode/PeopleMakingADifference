import {Component, OnInit} from '@angular/core';
import {NavController, LoadingController} from 'ionic-angular';
import {Platform} from 'ionic-angular';

import {AndroidPermissions} from '@ionic-native/android-permissions';

import {ConfigService} from '../../app/config.service';
import {User, UserService} from '../../app/user.service';
import {CheckIn2} from './check_in_2';

@Component({selector: 'page-check-in-1', templateUrl: 'check_in_1.html'})
export class CheckIn1 implements OnInit {
  eventId: string;
  phoneNum: number;
  errorMessage = '';

  constructor(
      public navCtrl: NavController, public configService: ConfigService,
      public userService: UserService, public loadingCtrl: LoadingController,
      public androidPermissions: AndroidPermissions, public platform: Platform) {}

   ngOnInit(): void {
    this.platform.ready().then(() => {
      if(this.platform.is('android')){
        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_SMS)
        .then(
          success => {
            console.log('Sms read permission granted')
            this.userService.watchForVerificationText()
          },
          err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_SMS)
        );

        this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_SMS]);
      }
      
    });
    
  }



  checkLogin(phone: number, eventId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      // clear the error message, if there is one
      this.errorMessage = '';

      // the config will determine which endpoint to use
      const apiEndpoint = this.configService.getEndpointUrl();
      const debugMode = this.userService.getDebug();
      const loginForm = {
        'phone': phone,
        'eventId': eventId,
        'debug': String(debugMode)
      }
      
      const formBody: string = this.configService.xwwwurlencode(loginForm);
      // make the HTTPRequest
      // see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
      fetch(`${apiEndpoint}update_checkin`, {
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
        const selectedUser = new User(json.id);
        try {
          const name = json.name;
          selectedUser.setName(name);
        } catch (e) {
          console.error(`Could not get the user's name: ${e}`);
        }
        this.userService.setUser(selectedUser);

        resolve(true);
      })
      // handle HTTP errors
      .catch((err) => {
        console.error(err);

        // if the response we get from the server is not valid json,
        // our attempt to JSON parse it above throws a SyntaxError
        // we always get invalid JSON when the ID is invalid
        // if (err.name === 'SyntaxError') {
        this.errorMessage = 'Invalid phone number, or you have already checked out of this event.';
        // }
        resolve(false);
      });
    });
    
  }

  onSubmitClick() {
    if(this.userService.getDebug()){

    }
    let loader = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Validating...'
    });
    loader.present();
    this.checkLogin(this.phoneNum, this.eventId)
    .then(login_valid => {
      loader.dismiss();
      if(login_valid === true) {
        // navigate to the main page
        this.navCtrl.push(CheckIn2);
      }
    });
  }

  
}
