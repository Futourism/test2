///<reference path="../../node_modules/angular2/typings/browser.d.ts"/>
import {Component, View} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';

@Component({
    selector:'contact-manager'
})
@View({
    template:'<h1>Welcome to {{title}}</h1>'
})
export class ContactManager { 
    title:string;

    constructor(){
        this.title = "Contact Manager";
    }
}

bootstrap(ContactManager)
    .then(app => {
        console.log('Bootstrap Successful');
    }, err => {
        console.error(err);
    });