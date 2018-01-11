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
import { ToastController } from 'ionic-angular';
/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var DataProvider = /** @class */ (function () {
    function DataProvider(storage, toastCtrl) {
        this.storage = storage;
        this.toastCtrl = toastCtrl;
    }
    // get data from storage
    DataProvider.prototype.getData = function (x) {
        return this.storage.get(x);
    };
    // save data in storage
    DataProvider.prototype.saveData = function (x, data) {
        this.storage.set(x, data);
    };
    // show toast message
    DataProvider.prototype.showToast = function (position, message, duration) {
        this.toastCtrl.create({
            position: position,
            message: message,
            duration: duration
        }).present();
    };
    DataProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Storage, ToastController])
    ], DataProvider);
    return DataProvider;
}());
export { DataProvider };
//# sourceMappingURL=data.js.map