import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	testName: string;

  constructor(public navCtrl: NavController) {
  	fetch("https://jsonplaceholder.typicode.com/users")
  	.then(lol => lol.json())
  	.then(json => this.testName = json[Math.floor(Math.random()*json.length)].name);
  }

}
