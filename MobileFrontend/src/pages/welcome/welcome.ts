import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {IDPage} from '../ID Page/IDPage';

@Component({selector: 'page-welcome', templateUrl: 'welcome.html'})
export class WelcomePage {
  constructor(public navCtrl: NavController) {}

  onGetStartedClick() {
    // navigate to the id page
    this.navCtrl.push(IDPage);
  }
}
