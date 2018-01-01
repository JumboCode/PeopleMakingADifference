import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {ConfigService} from '../../app/config.service';
import {User, UserService} from '../../app/user.service';

@Component({selector: 'page-check-out', templateUrl: 'check_out.html'})
export class CheckOut {
  exitId: number;
  errorMessage = '';

  constructor(
      public navCtrl: NavController, public configService: ConfigService,
      public userService: UserService) {}

  onCheckOutClick() {

  }
}
