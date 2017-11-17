import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {IDPage} from '../pages/ID Page/IDPage';
import {MainPage} from '../pages/main/main';
import {WelcomePage} from '../pages/welcome/welcome';

import {MyApp} from './app.component';
import {ConfigService} from './config.service';
import {UserService} from './user.service';

@NgModule({
  declarations: [MyApp, MainPage, IDPage, WelcomePage],
  imports: [BrowserModule, IonicModule.forRoot(MyApp)],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, MainPage, IDPage, WelcomePage],
  providers: [
    StatusBar, SplashScreen, ConfigService, UserService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
