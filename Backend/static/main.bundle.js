webpackJsonp(["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/***/ (function(module, exports) {

module.exports = "@font-face {\n\tfont-family: \"Avenir\";\n\tsrc: ../assets/Avenir;\n}\n\n.Avenir {\n\tfont-family: \"Avenir\", Verdana, Tahoma;\n}\n\n.Tahoma {\n\tfont-family: \"Tahoma\";\n\tcolor:#008675;\n}\n\n"

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<img src=\"assets/img/Logo.png\" alt = \"Logo\">\n<h1 class=\"changeColor\" class=\"Tahoma\"> People Making A Difference </h1>\n\n<h3 class=\"Tahoma\"> Learn Something New, Make New Friends, Do Something Good! </h3>\n\n<router-outlet></router-outlet>\n\n\n\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = /** @class */ (function () {
    function AppComponent(http) {
        var _this = this;
        this.http = http;
        this.errorMessage = '';
        this.bowls = [];
        this.showError = function (action) { return function (message) {
            console.error(message);
            _this.errorMessage = "Server error: Could not " + action + ".";
        }; };
    }
    AppComponent.prototype.ngOnInit = function () {
        this.loadItems();
    };
    // Gets the items into this.items by reading through the file
    AppComponent.prototype.loadItems = function () {
        var _this = this;
        this.http.get('/')
            .map(function (res) { return res.json(); })
            .subscribe(function (json) {
            _this.bowls = json;
        }, this.showError('reach database'));
    };
    AppComponent.prototype.postAssignment = function (volunteer, input_assignment) {
        this.errorMessage = '';
        this.http.post('/update_assignment', {
            uid: volunteer.id,
            assignment: input_assignment
        })
            .subscribe(function (res) {
            volunteer.assignment = input_assignment;
        }, this.showError("update assignment for " + volunteer.name));
    };
    AppComponent.prototype.postLocation = function (volunteer, input_location) {
        this.errorMessage = '';
        this.http.post('/update_location', {
            uid: volunteer.id,
            location: input_location
        })
            .subscribe(function (res) {
            volunteer.location = input_location;
        }, this.showError("update location for " + volunteer.name));
    };
    AppComponent.prototype.postMessage = function (bowl, input_message) {
        this.errorMessage = '';
        this.http.post('/update_message', {
            eventId: bowl.id,
            message: input_message
        })
            .subscribe(function (res) {
            bowl.message = input_message;
        }, this.showError("update message for " + bowl.name));
    };
    AppComponent.prototype.enableEditing = function (volunteer) {
        volunteer.edit = !volunteer.edit;
    };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("./src/app/app.component.html"),
            styles: [__webpack_require__("./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_createevent_createevent_component__ = __webpack_require__("./src/pages/createevent/createevent.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_dashboard_dashboard_component__ = __webpack_require__("./src/pages/dashboard/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_login_component__ = __webpack_require__("./src/pages/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__volunteer_time_pipe__ = __webpack_require__("./src/app/volunteer-time.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__volunteer_duration_pipe__ = __webpack_require__("./src/app/volunteer-duration.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angularfire2__ = __webpack_require__("./node_modules/angularfire2/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_angularfire2_auth__ = __webpack_require__("./node_modules/angularfire2/auth/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__environments_environment__ = __webpack_require__("./src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__app_component__ = __webpack_require__("./src/app/app.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














var appRoutes = [
    { path: 'create-event', component: __WEBPACK_IMPORTED_MODULE_5__pages_createevent_createevent_component__["a" /* CreateEventComponent */] },
    { path: 'dashboard', component: __WEBPACK_IMPORTED_MODULE_6__pages_dashboard_dashboard_component__["a" /* DashboardComponent */] },
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_7__pages_login_login_component__["a" /* LoginComponent */] },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_13__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_5__pages_createevent_createevent_component__["a" /* CreateEventComponent */],
                __WEBPACK_IMPORTED_MODULE_6__pages_dashboard_dashboard_component__["a" /* DashboardComponent */],
                __WEBPACK_IMPORTED_MODULE_7__pages_login_login_component__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_8__volunteer_time_pipe__["a" /* VolunteerTimePipe */],
                __WEBPACK_IMPORTED_MODULE_9__volunteer_duration_pipe__["a" /* VolunteerDurationPipe */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* JsonpModule */],
                __WEBPACK_IMPORTED_MODULE_10_angularfire2__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_12__environments_environment__["a" /* environment */].firebase),
                __WEBPACK_IMPORTED_MODULE_11_angularfire2_auth__["b" /* AngularFireAuthModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* RouterModule */].forRoot(appRoutes, { enableTracing: false } // <-- debugging purposes only
                )
            ],
            providers: [],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_13__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/volunteer-duration.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VolunteerDurationPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var VolunteerDurationPipe = /** @class */ (function () {
    function VolunteerDurationPipe() {
    }
    VolunteerDurationPipe.prototype.transform = function (value) {
        if (!(value > 0))
            return '';
        var seconds = value / 1000;
        var hoursDuration = Math.floor(seconds / (60 * 60));
        var minutesDuration = Math.floor((seconds - (hoursDuration * (60 * 60))) / 60);
        minutesDuration = 15 * (Math.round(minutesDuration / 15));
        if (minutesDuration === 60) {
            hoursDuration++;
            minutesDuration = 0;
        }
        return String(hoursDuration).padStart(2, '0') + ":" + String(minutesDuration).padStart(2, '0');
    };
    VolunteerDurationPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["T" /* Pipe */])({ name: 'volunteerDuration' })
    ], VolunteerDurationPipe);
    return VolunteerDurationPipe;
}());



/***/ }),

/***/ "./src/app/volunteer-time.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VolunteerTimePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var VolunteerTimePipe = /** @class */ (function () {
    function VolunteerTimePipe() {
    }
    VolunteerTimePipe.prototype.transform = function (value) {
        if (typeof value == "number")
            return new Date(value).toLocaleDateString('en-US', {
                day: 'numeric',
                year: '2-digit',
                month: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
            });
        return '';
    };
    VolunteerTimePipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["T" /* Pipe */])({ name: 'volunteerTime' })
    ], VolunteerTimePipe);
    return VolunteerTimePipe;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false,
    firebase: {
        apiKey: "AIzaSyAYwhC7v86pl92UtPXm68eMs9a6NI2DZ0Q",
        authDomain: "people-making-a-difference.firebaseapp.com",
        databaseURL: "https://people-making-a-difference.firebaseio.com",
        projectId: "people-making-a-difference",
        storageBucket: "people-making-a-difference.appspot.com",
        messagingSenderId: "70853020347"
    }
};


/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("./src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ "./src/pages/createevent/createevent.component.css":
/***/ (function(module, exports) {

module.exports = "label, button {\n\tcolor:#008675;\n}\n\n@font-face {\n\tfont-family: \"Avenir\";\n\tsrc: ../assets/Avenir;\n}\n\n.Avenir {\n\tfont-family: \"Avenir\", Verdana, Tahoma;\n}"

/***/ }),

/***/ "./src/pages/createevent/createevent.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"upload-feedback\" *ngIf=\"showFeedback\">\n  <h3>{{feedback}}</h3>\n  <button (click)=\"onReturnDashboardClick()\">Return to the Dashboard</button>\n</div>\n\n<div class=\"upload-form\" *ngIf=\"!showFeedback\">\n  <input type=\"text\" #nameField (keyup)=\"onTitleChange(nameField.value)\" placeholder=\"Name of Event\" />\n  <input type=\"file\" value=\"Upload File Here\" (change)=\"onFileChange($event)\"/>\n  <button (click)=\"onSubmitClick()\">Submit New Event</button>\n</div>"

/***/ }),

/***/ "./src/pages/createevent/createevent.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateEventComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CreateEventComponent = /** @class */ (function () {
    function CreateEventComponent(router) {
        this.router = router;
        this.showFeedback = false;
    }
    CreateEventComponent.prototype.ngOnInit = function () {
    };
    CreateEventComponent.prototype.onSubmitClick = function () {
        var _this = this;
        this.showFeedback = true;
        if (!this.nameFieldText) {
            this.feedback = "Please add an event name.";
            return;
        }
        if (!this.csvFile) {
            this.feedback = "Please attach a CSV file.";
            return;
        }
        var input = new FormData();
        input.append('csvFile', this.csvFile);
        input.append('eventName', this.nameFieldText);
        fetch("/update_event", {
            method: 'POST',
            body: input
        }).then(function (response) {
            response.text().then(function (text) {
                _this.feedback = text;
            });
        });
    };
    CreateEventComponent.prototype.onFileChange = function (event) {
        if (event.target.files.length > 0) {
            var file = event.target.files[0];
            this.csvFile = file;
        }
    };
    CreateEventComponent.prototype.onTitleChange = function (newText) {
        this.nameFieldText = newText;
    };
    CreateEventComponent.prototype.onReturnDashboardClick = function () {
        this.router.navigate(['/dashboard']);
    };
    CreateEventComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'create-event',
            template: __webpack_require__("./src/pages/createevent/createevent.component.html"),
            styles: [__webpack_require__("./src/pages/createevent/createevent.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]])
    ], CreateEventComponent);
    return CreateEventComponent;
}());



/***/ }),

/***/ "./src/pages/dashboard/dashboard.component.css":
/***/ (function(module, exports) {

module.exports = ".sameLine {\n  display: inline;\n  line-height: 80%;\n}\n\n.spaceWord {\n  word-spacing: 30px;\n}\n\n.changeColor {\n  color:#008675;\n}\n\ntable tr:nth-child(odd) {\n  background-color: #deefed;\n  padding-top: 12px;\n  padding-bottom: 12px;\n}\n\ntable th {\n  padding-top: 12px;\n  padding-bottom: 12px;\n  text-align: left;\n}\n\nlabel, button {\n  color:#008675;\n}"

/***/ }),

/***/ "./src/pages/dashboard/dashboard.component.html":
/***/ (function(module, exports) {

module.exports = "<nav>\n  <button (click)=\"goToCreateEvent()\">Create Event</button>\n</nav>\n\n<div class=\"bowls\">\n  <p *ngIf=\"errorMessage.length > 0;\" style=\"color: red;\">{{ errorMessage }}</p>\n  <div \n    class=\"bowl\"\n    *ngFor=\"let bowl of bowls;\"\n  >\n    <h3>{{ bowl.name }}</h3>\n    <p>Current Message: {{ bowl.message }}</p>\n    <p>Event Id: {{ bowl.id }}</p>\n    <p>Exit Id: {{bowl.exit_id}}</p>\n    <button (click)=\"sendCheckoutReminder(bowl)\">Send Checkout Reminder</button>\n    <p> \n      <label class=\"Tahoma\" for=\"message\">Send a message to all volunteers:</label>\n      <input \n        type=\"text\" \n        name=\"message\" \n        #message \n        (keyup.enter)=\"postMessage(bowl)\"\n        (keyup)=\"bowl.new_message = message.value\"\n      />\n      <button (click)=\"postMessage(bowl)\">Send</button>\n    </p>\n    \n\n    <ul>\n      <table class=\"Avenir\">\n\n        <th> Name </th>\n        <th> Assignment </th>\n        <th> Location </th>\n        <th> Check In </th>\n        <th> Check out </th>\n        <th> Volunteering Time </th>\n\n        <tr *ngFor=\"let volunteer of bowl.volunteers;\">\n            <td> {{ volunteer.name }} </td>\n\n            <td *ngIf=\"volunteer.edit\">\n              <input type=\"text\" name=\"vAssign\" #vassign \n                (keyup.enter)=\"saveEdits(volunteer)\"\n                (keyup)=\"volunteer.new_assignment = vassign.value\"\n                value=\"{{ volunteer.assignment }}\">\n            </td>\n            <td *ngIf=\"volunteer.edit\">\n              <input type=\"text\" name=\"vLoc\" #vloc \n              (keyup.enter)=\"saveEdits(volunteer)\"\n              (keyup)=\"volunteer.new_location = vloc.value\"\n              value=\"{{ volunteer.location }}\">\n            </td>\n            \n\n            <td *ngIf=\"!volunteer.edit\">\n              {{ volunteer.assignment }}\n            </td>\n            <td *ngIf=\"!volunteer.edit\">\n              {{ volunteer.location }}\n            </td>\n            <td>\n              {{ volunteer.checkin | volunteerTime }}\n            </td>\n            <td>\n              {{ volunteer.checkout | volunteerTime }}\n            </td>\n            <td>\n              {{ volunteer.checkout - volunteer.checkin | volunteerDuration }}\n            </td>\n            <td *ngIf=\"!volunteer.edit\">\n              <button (click)=\"enableEditing(volunteer)\">Edit</button>\n            </td>\n            <td *ngIf=\"volunteer.edit\">\n              <button (click)=\"saveEdits(volunteer)\">Save</button>\n            </td>\n            \n        </tr>\n      </table>\n    </ul>\n\n  </div>\n</div>"

/***/ }),

/***/ "./src/pages/dashboard/dashboard.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(http, router) {
        var _this = this;
        this.http = http;
        this.router = router;
        this.errorMessage = '';
        this.bowls = [];
        this.showError = function (action) { return function (message) {
            console.error(message);
            _this.errorMessage = "Server error: Could not " + action + ".";
        }; };
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.loadItems();
    };
    // Gets the items into this.items by reading through the file
    DashboardComponent.prototype.loadItems = function () {
        var _this = this;
        this.http.get('/')
            .map(function (res) { return res.json(); })
            .subscribe(function (json) {
            _this.bowls = json;
        }, this.showError('reach database'));
    };
    DashboardComponent.prototype.postAssignment = function (volunteer) {
        this.errorMessage = '';
        this.http.post('/update_assignment', {
            uid: volunteer.id,
            assignment: volunteer.new_assignment
        })
            .subscribe(function () {
            volunteer.assignment = volunteer.new_assignment;
            console.log('updated assignment');
        }, this.showError("update assignment for " + volunteer.name));
    };
    DashboardComponent.prototype.postLocation = function (volunteer) {
        this.errorMessage = '';
        this.http.post('/update_location', {
            uid: volunteer.id,
            location: volunteer.new_location
        })
            .subscribe(function () {
            volunteer.location = volunteer.new_location;
            console.log('updated location');
        }, this.showError("update location for " + volunteer.name));
    };
    DashboardComponent.prototype.postMessage = function (bowl) {
        if (!bowl.new_message || bowl.new_message === bowl.message) {
            console.log("nope");
            return;
        }
        this.errorMessage = '';
        this.http.post('/update_message', {
            eventId: bowl.id,
            message: bowl.new_message
        })
            .subscribe(function (res) {
            bowl.message = bowl.new_message;
            console.log('updated message');
        }, this.showError("update message for " + bowl.name));
    };
    DashboardComponent.prototype.enableEditing = function (volunteer) {
        volunteer.edit = true;
    };
    DashboardComponent.prototype.saveEdits = function (volunteer) {
        if (volunteer.new_location !== volunteer.location && volunteer.new_location) {
            this.postLocation(volunteer);
        }
        if (volunteer.new_assignment !== volunteer.assignment && volunteer.new_assignment) {
            this.postAssignment(volunteer);
        }
        volunteer.edit = false;
    };
    DashboardComponent.prototype.goToCreateEvent = function () {
        this.router.navigate(['/create-event']);
    };
    DashboardComponent.prototype.sendCheckoutReminder = function (bowl) {
        this.http.post('/update_reminder', {
            eventId: bowl.id
        })
            .subscribe(function (res) {
            console.log('reminder', res);
        }, this.showError("send reminder for " + bowl.name));
    };
    DashboardComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'dashboard',
            template: __webpack_require__("./src/pages/dashboard/dashboard.component.html"),
            styles: [__webpack_require__("./src/pages/dashboard/dashboard.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]])
    ], DashboardComponent);
    return DashboardComponent;
}());



/***/ }),

/***/ "./src/pages/login/login.component.css":
/***/ (function(module, exports) {

module.exports = "label, button {\n\tcolor:#008675;\n}\n\n@font-face {\n\tfont-family: \"Avenir\";\n\tsrc: ../assets/Avenir;\n}\n\n.Avenir {\n\tfont-family: \"Avenir\", Verdana, Tahoma;\n}\n\nbody {\n    font-family: \"Avenir\";\n}\n\n#header {\n    background: #00B29A;\n    height: 190px;\n    color: white;\n    font-size: 25px;\n    padding-top: 40px;\n    padding-left: calc(2.5% + 200px);\n}\n\n#title {\n    font-size: 35px;\n}\n\n#logo {\n    position: absolute;\n    top: 30px;\n    left: 2.5%;\n}\n\n#padding {\n    padding: 40px;\n}\n\n#padding2 {\n    padding: 15px;\n}\n\ndiv.container {\n    text-align: center;\n    color: gray;\n    border: 1px solid silver;\n    width: 500px;\n    height: 160px;\n    margin: auto;\n    padding-top: 50px;\n    padding-bottom: 25px;\n    border-radius: 10px;\n    font-size: 30px;\n}\n\nbutton {\n    background-color: #00B29A;\n    border-radius: 4px;\n    border: none;\n    color: white;\n    font-size: 18px;\n    height: 35px;\n    width: 150px;\n}\n"

/***/ }),

/***/ "./src/pages/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<form>\n  <p *ngIf=\"error\" style=\"color: red;\">{{errorMessage}}</p>\n  <div class=\"form-group\">\n    <label for=\"username\">Username</label>\n    <input #uname type=\"text\" class=\"form-control\" id=\"username\" required>\n  </div>\n\n  <div class=\"form-group\">\n    <label for=\"password\">Password</label>\n    <input #pass type=\"password\" class=\"form-control\" id=\"password\">\n  </div>\n  <div id=\"padding2\"></div>\n  <button type=\"submit\" class=\"btn btn-success\" (click)=\"doLogin(uname, pass)\">Submit</button>\n</form>\n"

/***/ }),

/***/ "./src/pages/login/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__("./node_modules/angularfire2/auth/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, afAuth) {
        this.router = router;
        this.afAuth = afAuth;
        this.error = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.demoNavigate = function () {
        this.router.navigate(['/dashboard']);
    };
    LoginComponent.prototype.doLogin = function (username, password) {
        var _this = this;
        this.afAuth.auth.signInWithEmailAndPassword(username.value, password.value)
            .then(function (user) {
            _this.router.navigate(['/dashboard']);
        })
            .catch(function (err) {
            console.log('got here');
            _this.error = true;
            _this.errorMessage = "Incorrect username or password.";
        });
    };
    LoginComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'login',
            template: __webpack_require__("./src/pages/login/login.component.html"),
            styles: [__webpack_require__("./src/pages/login/login.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map