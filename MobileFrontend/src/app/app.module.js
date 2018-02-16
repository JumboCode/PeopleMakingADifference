var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicErrorHandler, IonicModule, LoadingController } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { FCM } from '@ionic-native/fcm';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CheckIn1 } from '../pages/check_in/check_in_1';
import { CheckIn2 } from '../pages/check_in/check_in_2';
import { CheckOut } from '../pages/check_out/check_out';
import { MainPage } from '../pages/main/main';
import { WelcomePage } from '../pages/welcome/welcome';
import { MyApp } from './app.component';
import { ConfigService } from './config.service';
import { UserService } from './user.service';
import { PushService } from './push.service';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [MyApp, MainPage, CheckIn1, CheckIn2, CheckOut, WelcomePage],
            imports: [BrowserModule, IonicModule.forRoot(MyApp), IonicStorageModule.forRoot()],
            bootstrap: [IonicApp],
            entryComponents: [MyApp, WelcomePage, CheckIn1, CheckIn2, CheckOut, MainPage],
            providers: [
                ConfigService, UserService, LoadingController, PushService, FCM, SplashScreen,
                { provide: ErrorHandler, useClass: IonicErrorHandler }
            ]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map