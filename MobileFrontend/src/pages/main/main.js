var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { ConfigService } from '../../app/config.service';
import { UserService } from '../../app/user.service';
import { CheckOut } from '../check_out/check_out';
import { PushService } from '../../app/push.service';
var MainPage = /** @class */ (function () {
    function MainPage(navCtrl, configService, userService, loadingCtrl, pushService) {
        this.navCtrl = navCtrl;
        this.configService = configService;
        this.userService = userService;
        this.loadingCtrl = loadingCtrl;
        this.pushService = pushService;
        this.personId = userService.getUser().id;
        this.announcementMessage =
            'This is a message to all volunteers, please have the most fun and thank you for volunteering! \ud83d\ude03';
    }
    MainPage.prototype.ngOnInit = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            spinner: 'crescent',
            content: 'Loading...'
        });
        loader.present();
        // Hit the backend for the data we need, then hide the loading spinner.
        Promise.all([
            this.getManifest(),
            this.getMessage()
        ]).then(function () {
            loader.dismiss();
        });
        setInterval(function () {
            _this.pollBackend();
            console.log("polling backend");
        }, 7500);
        this.pushService.register(this.userService.getUser(), this.configService.getEndpointUrl())
            .then(function (response) {
            console.log('push response', response);
        });
    };
    MainPage.prototype.pollBackend = function () {
        this.getManifest();
        this.getMessage();
    };
    MainPage.prototype.getManifest = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // the api we hit that runs remotely - the "real" one
            var apiEndpoint = _this.configService.getEndpointUrl();
            // make the HTTPRequest
            // see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
            fetch(apiEndpoint + "uid/" + String(_this.personId))
                .then(function (blob) { return blob.json(); })
                .then(function (json) {
                if (json.length > 0) {
                    // set the values that are bound in the template
                    _this.personName = json[0].name;
                    _this.personAssignment = json[0].assignment;
                    _this.personLocation = json[0].location;
                }
                else {
                    throw new Error("JSON response from " + apiEndpoint + " formatted incorrectly, expecting at least one result.");
                }
                resolve();
                return;
            })
                .catch(function (err) {
                _this.personName = 'ERROR';
                _this.personAssignment = 'ERROR';
                console.error(err);
                console.error('Try turning on CORS or switching DEV_MODE');
                reject();
                return;
            });
        });
    };
    MainPage.prototype.getMessage = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var apiEndpoint = _this.configService.getEndpointUrl();
            fetch(apiEndpoint + 'get_message')
                .then(function (blob) { return blob.text(); })
                .then(function (message) {
                _this.announcementMessage = message;
                resolve();
            });
        });
    };
    MainPage.prototype.onDoneClick = function () {
        this.navCtrl.push(CheckOut);
    };
    MainPage.prototype.onSaveUserClick = function () {
        this.userService.saveUser();
    };
    MainPage.prototype.onLoadUserClick = function () {
        this.userService.loadUser().then(function (response) { return console.log('load_response', response); });
    };
    MainPage.prototype.onDeleteUserClick = function () {
        this.userService.deleteUser();
    };
    MainPage = __decorate([
        Component({ selector: 'page-main', templateUrl: 'main.html' }),
        __metadata("design:paramtypes", [NavController, ConfigService,
            UserService, LoadingController,
            PushService])
    ], MainPage);
    return MainPage;
}());
export { MainPage };
//# sourceMappingURL=main.js.map