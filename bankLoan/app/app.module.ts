import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from "@angular/forms";
import {HttpModule, JsonpModule } from "@angular/http";

import { appLoan }   from './app.loan';
@NgModule({
    imports: [BrowserModule, ReactiveFormsModule, HttpModule, JsonpModule],
    declarations: [appLoan],
    bootstrap: [appLoan]
})
export class AppModule { }
