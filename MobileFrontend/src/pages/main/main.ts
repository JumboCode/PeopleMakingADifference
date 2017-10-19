import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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
    // make the HTTPRequest
    // see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
    fetch("http://pmd-server.herokuapp.com/"+String(this.personId))

    // convert the blob request and JSON parse it asynchronously
    .then((blob) => blob.json())

    .then((json) => {
      // pick an index randomly between 0 and the array length - 1
      let selectedRandom = Math.floor(Math.random() * json.length);

      // set the values that are bound in the template
      this.personName = json[selectedRandom].name;
      this.personAssignment = json[selectedRandom].assignment;
    });
  }

}
