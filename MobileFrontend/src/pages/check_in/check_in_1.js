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
import { User, UserService } from '../../app/user.service';
import { CheckIn2 } from './check_in_2';
var CheckIn1 = /** @class */ (function () {
    function CheckIn1(navCtrl, configService, userService, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.configService = configService;
        this.userService = userService;
        this.loadingCtrl = loadingCtrl;
        this.errorMessage = '';
    }
    CheckIn1.prototype.checkID = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // clear the error message, if there is one
            _this.errorMessage = '';
            // the config will determine which endpoint to use
            var apiEndpoint = _this.configService.getEndpointUrl();
            // make the HTTPRequest
            // see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
            fetch(apiEndpoint + "uid/" + String(id))
                .then(function (blob) { return blob.json(); })
                .then(function (json) {
                // the id provided is valid - set the current user of the app to use
                // this id
                var selectedUser = new User(id);
                try {
                    var name_1 = json[0].name;
                    selectedUser.setName(name_1);
                }
                catch (e) {
                    console.error("Could not get the user's name: " + e);
                }
                _this.userService.setUser(selectedUser);
                resolve(true);
            })
                .catch(function (err) {
                console.error(err);
                console.error('Try turning on CORS or switching DEV_MODE');
                // if the response we get from the server is not valid json,
                // our attempt to JSON parse it above throws a SyntaxError
                // we always get invalid JSON when the ID is invalid
                if (err.name === 'SyntaxError') {
                    _this.errorMessage = 'Invalid ID';
                }
                resolve(false);
            });
        });
    };
    CheckIn1.prototype.onSubmitClick = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            spinner: 'crescent',
            content: 'Validating...'
        });
        loader.present();
        this.checkID(this.eventId)
            .then(function (id_valid) {
            loader.dismiss();
            if (id_valid === true) {
                // navigate to the main page
                _this.navCtrl.push(CheckIn2);
            }
        });
    };
    CheckIn1 = __decorate([
        Component({ selector: 'page-check-in-1', templateUrl: 'check_in_1.html' }),
        __metadata("design:paramtypes", [NavController, ConfigService,
            UserService, LoadingController])
    ], CheckIn1);
    return CheckIn1;
}());
export { CheckIn1 };
//# sourceMappingURL=check_in_1.js.map