import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	testName: string;

  constructor(public navCtrl: NavController) {
  	fetch("http://pmd-server.herokuapp.com/")
  	.then(function(json) {
		this.testName = json[Math.floor(Math.random()*json.length)].name;
		this.testAssign = json[Math.floor(Math.random()*json.length)].assignment;
	});
  }

}
