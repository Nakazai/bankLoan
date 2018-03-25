"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var Customer_1 = require('./Customer');
var http_1 = require('@angular/http');
var http_2 = require('@angular/http');
require("rxjs/add/operator/map");
var appLoan = (function () {
    function appLoan(_http, fb) {
        this._http = _http;
        this.show = false;
        this.showCustomers();
        this.loanForm = fb.group({
            ssn: ["", forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern("[0-9]{11}")])],
            phoneNum: ["", forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern("[0-9]{8}")])],
            email: ["", forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern("[a-zA-Z0-9 .-]+@[a-zA-Z]+\\.[a-zA-Z]{2,}")])],
            loanMoney: ["", forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern("[0-9]{3,7}")])],
            years: ["", forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern("[0-9]{1,2}")])]
        });
    }
    appLoan.prototype.showCustomers = function () {
        var _this = this;
        this._http.get("api/loan")
            .map(function (returnData) {
            return returnData.json();
        })
            .subscribe(function (Return) {
            _this.list = Return;
        }, function (error) { return console.log("Something wrong with the server"); }, function () { return console.log(""); });
    };
    appLoan.prototype.showList = function () {
        this.show = !this.show;
    };
    appLoan.prototype.calculateLoan = function () {
        this.loanAmount = this.loanForm.value.loanMoney;
        this.numOfYears = this.loanForm.value.years;
        if (this.loanAmount > 0 && this.numOfYears > 0) {
            var firstCalc = 0.07 * this.loanAmount;
            var secondCalc = 1 - Math.pow(1 + 0.07, -this.numOfYears);
            this.result = ((firstCalc / secondCalc) / 12).toFixed(2) + " kr pr month";
        }
        else {
            this.result = "";
        }
    };
    appLoan.prototype.saveCustomer = function () {
        var _this = this;
        var customerSaved = new Customer_1.Customer();
        customerSaved.SSN = this.loanForm.value.ssn;
        customerSaved.phoneNum = this.loanForm.value.phoneNum;
        customerSaved.email = this.loanForm.value.email;
        customerSaved.loanAmount = this.loanForm.value.loanMoney;
        customerSaved.numOfYears = this.loanForm.value.years;
        var body = JSON.stringify(customerSaved);
        var headers = new http_1.Headers({ "Content-Type": "application/json" });
        this._http.post("api/loan", body, { headers: headers })
            .map(function (returnData) {
            return returnData;
        })
            .subscribe(function (Return) {
            alert("Loan is registered!");
            _this.showCustomers();
        }, function (error) { return alert(error.statusText); }, function () { return console.log("done post-api/customer"); });
    };
    appLoan.prototype.onSubmit = function () {
        this.saveCustomer();
    };
    appLoan = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './app/loanForm.html'
        }), 
        __metadata('design:paramtypes', [http_2.Http, forms_1.FormBuilder])
    ], appLoan);
    return appLoan;
}());
exports.appLoan = appLoan;
//# sourceMappingURL=app.loan.js.map