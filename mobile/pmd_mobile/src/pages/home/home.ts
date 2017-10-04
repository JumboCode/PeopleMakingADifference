import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	personName: any;
	personAssignment: string;

  constructor(public navCtrl: NavController) {
	let that = this;
  	fetch("http://pmd-server.herokuapp.com")
  	.then(function(blob){
		blob.json()
		.then(function(json){
			let selectedRandom = Math.floor(Math.random() * json.length);
			that.personName = json[selectedRandom].name;
			that.personAssignment = json[selectedRandom].assignment;
		});
		
	});
  }

}
