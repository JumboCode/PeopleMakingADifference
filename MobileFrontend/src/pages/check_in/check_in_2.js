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
import { NavController } from 'ionic-angular';
import { UserService } from '../../app/user.service';
import { MainPage } from '../main/main';
var CheckIn2 = /** @class */ (function () {
    function CheckIn2(navCtrl, userService) {
        this.navCtrl = navCtrl;
        this.userService = userService;
        this.personName = "Lucy";
        this.errorMessage = '';
        this.personName = userService.getUser().name;
    }
    CheckIn2.prototype.onSubmitClick = function () {
        this.navCtrl.push(MainPage);
    };
    CheckIn2 = __decorate([
        Component({ selector: 'page-check-in-2', templateUrl: 'check_in_2.html' }),
        __metadata("design:paramtypes", [NavController, UserService])
    ], CheckIn2);
    return CheckIn2;
}());
export { CheckIn2 };
//# sourceMappingURL=check_in_2.js.map