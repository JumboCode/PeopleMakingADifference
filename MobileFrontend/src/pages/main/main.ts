import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as config from '../../../ionic.config.json';

@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {

  personId: number = 2; //set to specific id temporarily
  personName: string;
  personAssignment: string;

  constructor(public navCtrl: NavController) {
    this.getManifest()
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
      // pick an index randomly between 0 and the array length - 1
      let selectedRandom = Math.floor(Math.random() * json.length);

      // set the values that are bound in the template
  		this.personName = json[selectedRandom].name;
  		this.personAssignment = json[selectedRandom].assignment;
    })
    // handle HTTP errors
    .catch((err) => {
      this.personName = "ERROR";
      this.personAssignment = "ERROR";
      console.error(err);
    })

  }



}
