import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Customer } from './Customer';
import { Headers } from '@angular/http';
import { Http, Response } from '@angular/http';
import "rxjs/add/operator/map";

@Component({
    selector: 'my-app',
    templateUrl: './app/loanForm.html'
})

export class AppComponent {
    loanAmount: number;
    numOfYears: number;
    result: string;
    show: boolean = false;
    
    list: Array<Customer>;

    loanForm: FormGroup;
    constructor(private _http: Http, fb: FormBuilder) {
        this.showCustomers();
        this.loanForm = fb.group({
            ssn: ["", Validators.compose([Validators.required, Validators.pattern("[0-9]{11}")])],
            phoneNum: ["", Validators.compose([Validators.required, Validators.pattern("[0-9]{8}")])],
            email: ["", Validators.compose([Validators.required, Validators.pattern("[a-zA-Z0-9 .-]+@[a-zA-Z]+.[a-zA-Z]{2,}")])],
            loanMoney: ["", Validators.compose([Validators.required, Validators.pattern("[0-9]{3,6}")])],
            years: ["", Validators.compose([Validators.required, Validators.pattern("[0-9]{1,2}")])]
        });
    }

    calculateLoan() {
        this.loanAmount = this.loanForm.value.loanMoney;
        this.numOfYears = this.loanForm.value.years;
        if (this.loanAmount > 0 && this.numOfYears > 0) {
            var firstCalc = 0.07 * this.loanAmount;
            var secondCalc = 1 - Math.pow(1 + 0.07, -this.numOfYears);
            this.result = ((firstCalc / secondCalc) / 12).toFixed(2) + " kr pr month.";
        }
        else {
            this.result = "";
        }
    }

    saveCustomer() {
        let CustomerSaved = new Customer();

        CustomerSaved.SSN = this.loanForm.value.ssn;
        CustomerSaved.phoneNum = this.loanForm.value.phoneNum;
        CustomerSaved.email = this.loanForm.value.email;
        CustomerSaved.loanAmount = this.loanForm.value.loanMoney;
        CustomerSaved.numOfYears = this.loanForm.value.years;

        var body: string = JSON.stringify(CustomerSaved);
        var headers = new Headers({ "Content-Type": "application/json" });

        this._http.post("api/loan", body, { headers: headers })
            .map(returnData => { return returnData })
            .subscribe(
            Return => {
                alert("Loan is registered!");
                this.showCustomers();
            },
            error => alert(error.statusText),
            () => console.log("done post-api/customer")
            );
    }
    
    onSubmit() {
        this.saveCustomer();
    }

    showCustomers() {
        this._http.get("api/loan")
            .map(returnData => { return returnData.json() })
            .subscribe(
            Return => {
                this.list = Return;
            },
            error => console.log("Something wrong with the server"),
            () => console.log("")
            );
    }

    showList() {
        this.show = !this.show;
    }
}
