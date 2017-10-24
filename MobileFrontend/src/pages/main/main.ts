import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as config from '../../../ionic.config.json';

@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage implements OnInit {

  personId: number = 2; //set to specific id temporarily
  personName: string;
  personAssignment: string;

  constructor(public navCtrl: NavController) {}

  ngOnInit(): void {
    this.getManifest();
  }

  onRefreshClick() {
    this.getManifest()
  }

  getManifest() {
    // the api we hit that runs remotely - the "real" one
    let apiEndpoint = "http://pmd-server.herokuapp.com/";

    // check if we're trying to run locally
    if(config['DEV_MODE'] === true){
      apiEndpoint = "http://localhost:5000/";
    }

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
