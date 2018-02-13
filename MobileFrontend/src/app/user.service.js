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
// Represents a user of the app, and contains all the info needed to fetch from
// the server for this user
var User = /** @class */ (function () {
    function User(id) {
        this.id = id;
    }
    User.prototype.setName = function (name) { this.name = name; };
    return User;
}());
export { User };
var UserService = /** @class */ (function () {
    function UserService(storage) {
        this.storage = storage;
    }
    // set the current user to:
    UserService.prototype.setUser = function (newUser) {
        this.user = newUser;
    };
    UserService.prototype.getUser = function () {
        return this.user;
    };
    UserService.prototype.saveUser = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.ready()
                .then(function () {
                _this.storage.set('saved_user', JSON.stringify(_this.getUser()))
                    .then(function (save_result) {
                    console.log('saved user', save_result);
                    resolve(save_result);
                });
            });
        });
    };
    UserService.prototype.loadUser = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.ready()
                .then(function () {
                _this.storage.get('saved_user')
                    .then(function (saved_user) {
                    // not truthy - this definitely works for localstorage, but the other
                    // persistent storage drivers might return something else. 
                    // documentation is unclear.
                    if (!saved_user) {
                        resolve(false);
                        return;
                    }
                    // storage is <string, string> so rehydrate the string as an anonymous object
                    saved_user = JSON.parse(saved_user);
                    // use the parameters of the anonymous object to create a new typed object
                    var ressurected = new User(saved_user.id);
                    ressurected.setName(saved_user.name);
                    _this.user = ressurected;
                    resolve(_this.user);
                });
            });
        });
    };
    UserService.prototype.deleteUser = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.ready()
                .then(function () {
                _this.storage.remove('saved_user')
                    .then(function (deleted_user) {
                    console.log('deleted user', deleted_user);
                    resolve(deleted_user);
                });
            });
        });
    };
    UserService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Storage])
    ], UserService);
    return UserService;
}());
export { UserService };
//# sourceMappingURL=user.service.js.map