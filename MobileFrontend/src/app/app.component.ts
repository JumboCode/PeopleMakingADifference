import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {UserService} from './user.service';
import {SplashScreen} from '@ionic-native/splash-screen';

import {WelcomePage} from '../pages/welcome/welcome';
import {MainPage} from '../pages/main/main';

@Component({templateUrl: 'app.html'})
export class MyApp {
  rootPage: {};

  constructor(
      platform: Platform, 
      userService: UserService, 
      splashScreen: SplashScreen
  ) {
    userService.loadUser()
    .then(loaded_user => {
      this.rootPage = (loaded_user) ? MainPage : WelcomePage;
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      splashScreen.hide();
    });
  }
}
