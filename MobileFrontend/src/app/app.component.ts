import {Component} from '@angular/core';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {Platform} from 'ionic-angular';
import {UserService} from './user.service';

import {WelcomePage} from '../pages/welcome/welcome';
import {MainPage} from '../pages/main/main';

@Component({templateUrl: 'app.html'})
export class MyApp {
  rootPage: {};

  constructor(
      platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, userService: UserService) {
    userService.loadUser()
    .then(loaded_user => {
      this.rootPage = (loaded_user) ? MainPage : WelcomePage;
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
