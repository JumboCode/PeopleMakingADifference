var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FCM } from '@ionic-native/fcm';
// allows the app to receive push notifications
var PushService = /** @class */ (function () {
    function PushService(storage, fcm) {
        this.storage = storage;
        this.fcm = fcm;
    }
    PushService.prototype.is_registered = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.ready()
                .then(function () {
                _this.storage.get('token')
                    .then(function (token) {
                    if (!token) {
                        resolve(false);
                        return;
                    }
                    resolve(true);
                });
            });
        });
    };
    PushService.prototype.register = function (user, endpoint) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.fcm.subscribeToTopic('all');
            _this.fcm.getToken().then(function (token) {
                _this.send_token(endpoint, token, user.id)
                    .then(function (response) { return resolve(response); })
                    .catch(function (err) { return reject(err); });
            });
        });
    };
    PushService.prototype.send_token = function (endpoint, token, uid) {
        return new Promise(function (resolve, reject) {
            fetch(endpoint + "update_token", {
                method: 'POST',
                body: JSON.stringify({
                    uid: uid,
                    token: token
                }),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
                .then(function (blob) { return blob.text(); })
                .then(function (text) { return resolve(text); })
                .catch(function (err) { return reject(err); });
        });
    };
    PushService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Storage,
            FCM])
    ], PushService);
    return PushService;
}());
export { PushService };
//# sourceMappingURL=push.service.js.map