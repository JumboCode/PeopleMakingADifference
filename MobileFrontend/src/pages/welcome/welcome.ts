import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {CheckIn1} from '../check_in/check_in_1';

@Component({selector: 'page-welcome', templateUrl: 'welcome.html'})
export class WelcomePage {
  constructor(public navCtrl: NavController) {}

  onGetStartedClick() {
    // navigate to the id page
    this.navCtrl.push(CheckIn1);
  }
}
