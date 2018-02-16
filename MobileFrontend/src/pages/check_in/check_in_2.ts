import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {ConfigService} from '../../app/config.service';
import {User, UserService} from '../../app/user.service';
import {MainPage} from '../main/main';

@Component({selector: 'page-check-in-2', templateUrl: 'check_in_2.html'})
export class CheckIn2 {
  personName: string;
  errorMessage: string;
  responseCode: number;

  constructor(
      public navCtrl: NavController, public userService: UserService) {
    this.personName = userService.getUser().name;
  }

  onSubmitClick() {
    this.navCtrl.push(MainPage);
  }
}
