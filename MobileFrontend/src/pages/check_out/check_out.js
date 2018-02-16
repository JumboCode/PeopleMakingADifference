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
import { ConfigService } from '../../app/config.service';
import { UserService } from '../../app/user.service';
var CheckOut = /** @class */ (function () {
    function CheckOut(navCtrl, configService, userService) {
        this.navCtrl = navCtrl;
        this.configService = configService;
        this.userService = userService;
        this.errorMessage = '';
    }
    CheckOut.prototype.onCheckOutClick = function () {
    };
    CheckOut = __decorate([
        Component({ selector: 'page-check-out', templateUrl: 'check_out.html' }),
        __metadata("design:paramtypes", [NavController, ConfigService,
            UserService])
    ], CheckOut);
    return CheckOut;
}());
export { CheckOut };
//# sourceMappingURL=check_out.js.map