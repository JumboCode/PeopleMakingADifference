import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {CheckIn1} from '../check_in/check_in_1';
import {UserService} from '../../app/user.service';
import {Platform} from 'ionic-angular';

@Component({selector: 'page-welcome', templateUrl: 'welcome.html'})
export class WelcomePage implements OnInit {
  constructor(public navCtrl: NavController, public userService: UserService, public platform: Platform) {}
  notAndroid: boolean = true;
  debugSms: boolean = true;
  ngOnInit(): void {
    this.platform.ready().then(() => {
      this.notAndroid = !this.platform.is('android');
    });
  }
  
  onGetStartedClick() {
    this.userService.setDebug(this.debugSms);
    // navigate to the id page
    this.navCtrl.push(CheckIn1);
  }
}
