import {Component, OnInit} from '@angular/core';
import {NavController, LoadingController} from 'ionic-angular';
import {ConfigService} from '../../app/config.service';
import {UserService} from '../../app/user.service';
import {CheckOut} from '../check_out/check_out';

@Component({selector: 'page-main', templateUrl: 'main.html'})
export class MainPage implements OnInit {
  personId: number;
  personName: string;
  personAssignment: string;
  personLocation: string;
  announcementMessage: string;

  constructor(
      public navCtrl: NavController, public configService: ConfigService,
      public userService: UserService, public loadingCtrl: LoadingController) {
    this.personId = userService.getUser().id;
    this.announcementMessage =
        'This is a message to all volunteers, please have the most fun and thank you for volunteering! \ud83d\ude03';
  }

  ngOnInit(): void {
    let loader = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Loading...'
    });
    loader.present();
    
    // Hit the backend for the data we need, then hide the loading spinner.
    Promise.all(
      [
        this.getManifest(),
        this.getMessage()
      ]
    ).then(() => {
      loader.dismiss();
    }).catch((err) => {
      console.error(err);
      loader.dismiss();
    });
    
    setInterval(() => {
	    this.pollBackend();
      console.log("polling backend");
    }, 7500);
  }

  pollBackend() {
    this.getManifest()
      .catch((err) => console.error(err));
    this.getMessage()
      .catch((err) => console.error(err));
  }

  getManifest(): Promise<{}> {
    return new Promise((resolve, reject) => {
      // the api we hit that runs remotely - the "real" one
      const apiEndpoint = this.configService.getEndpointUrl();

      // make the HTTPRequest
      // see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
      fetch(`${apiEndpoint}uid/${String(this.personId)}`)
          // convert the blob request and JSON parse it asynchronously
          .then((blob) => blob.json())

          .then((json) => {
            if (json.name && json.assignment && json.location) {
              // set the values that are bound in the template
              this.personName = json.name;
              this.personAssignment = json.assignment;
              this.personLocation = json.location;
            } else {
              throw new Error(`JSON response from ${
                  apiEndpoint} formatted incorrectly, expecting at least one result.`);
            }
            resolve(); 
            return;
          })
          // handle HTTP errors
          .catch((err) => {
            this.personName = 'ERROR';
            this.personAssignment = 'ERROR';
            console.error(err);
            console.error('Try turning on CORS or switching DEV_MODE');
            reject();
            return;
          });
      });
  }

  getMessage(): Promise<{}> {
    return new Promise((resolve, reject) => {
      const apiEndpoint = this.configService.getEndpointUrl();

      fetch(`${apiEndpoint}get_message/${String(this.personId)}`)
        .then((blob) => blob.text())
        .then((message) => {
          this.announcementMessage = message;
          resolve();
        })
        .catch((err) => {
          reject(err);
          return;
        });
    });
  }

  onDoneClick() {
    this.navCtrl.push(CheckOut);
  }
  
  onSaveUserClick() {
    this.userService.saveUser();
  }
  
  onLoadUserClick() {
    this.userService.loadUser().then(response => console.log('load_response', response));
  }
  
  onDeleteUserClick() {
    this.userService.deleteUser();
  }
}
