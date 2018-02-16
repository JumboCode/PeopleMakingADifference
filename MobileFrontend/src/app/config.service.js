var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import * as config from '../../ionic.config.json';
// allows different parts of the app to fetch configurable data
var ConfigService = /** @class */ (function () {
    function ConfigService() {
    }
    ConfigService.prototype.getEndpointUrl = function () {
        if (config['DEV_MODE'] === true) {
            return config['DEV_SERVER'];
        }
        return config['PROD_SERVER'];
    };
    ConfigService = __decorate([
        Injectable()
    ], ConfigService);
    return ConfigService;
}());
export { ConfigService };
//# sourceMappingURL=config.service.js.map