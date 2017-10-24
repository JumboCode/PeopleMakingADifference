import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-idpage',
  templateUrl: 'IDPage.html'
})
export class IDPage implements OnInit {

  personId: number;

  constructor(public navCtrl: NavController) {}

  ngOnInit(): void {}

  checkID(id: number) {
    // the api we hit that runs remotely - the "real" one
    let apiEndpoint = "http://54.85.114.246:5000/";

    // make the HTTPRequest
    // see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
    fetch(apiEndpoint + String(id))

    // convert the blob request and JSON parse it asynchronously
    .then((blob) => blob.json())

    .then((json) => {
      // do something
    })
    // handle HTTP errors
    .catch((err) => {
      console.error(err);
      console.error("Try turning on CORS or switching DEV_MODE");
    })

  }



}
