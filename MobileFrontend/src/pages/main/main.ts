import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ConfigService } from '../../app/config.service';
import { UserService } from '../../app/user.service';

@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage implements OnInit {

  personId: number;
  personName: string;
  personAssignment: string;
  announcementMessage: string;

  constructor(public navCtrl: NavController, public configSerivce: ConfigService, userService: UserService) {
    this.personId = userService.getUser().id;
    this.announcementMessage = "😃 Placeholder for the general message! 😎";
  }

  ngOnInit(): void {
    this.getManifest();
  }

  onRefreshClick() {
    this.getManifest()
  }

  getManifest() {
    // the api we hit that runs remotely - the "real" one
    let apiEndpoint = this.configSerivce.getEndpointUrl();

    // make the HTTPRequest
    // see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
    fetch(apiEndpoint + String(this.personId))

    // convert the blob request and JSON parse it asynchronously
    .then((blob) => blob.json())

    .then((json) => {
      if(json.length > 0){
        // set the values that are bound in the template
        this.personName = json[0].name;
        this.personAssignment = json[0].assignment;
      } else {
        throw new Error(`JSON response from ${apiEndpoint} formatted incorrectly, expecting at least one result.`);
      }
    })
    // handle HTTP errors
    .catch((err) => {
      this.personName = "ERROR";
      this.personAssignment = "ERROR";
      console.error(err);
      console.error("Try turning on CORS or switching DEV_MODE");
    })

  }



}
