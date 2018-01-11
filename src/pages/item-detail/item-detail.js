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
import { NavController, NavParams, ViewController } from 'ionic-angular';
/**
 * Generated class for the ItemDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ItemDetailPage = /** @class */ (function () {
    function ItemDetailPage(navCtrl, navParams, view) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.view = view;
        this.index = this.navParams.get('index');
        this.taskType = this.navParams.get('taskType');
    }
    ItemDetailPage.prototype.ionViewDidLoad = function () {
        // fetch task to show
    };
    ItemDetailPage.prototype.changeStatus = function (event) {
        var data = {
            index: this.index,
            taskType: this.taskType
        };
        this.view.dismiss(this.index);
    };
    ItemDetailPage = __decorate([
        Component({
            selector: 'page-item-detail',
            templateUrl: 'item-detail.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, ViewController])
    ], ItemDetailPage);
    return ItemDetailPage;
}());
export { ItemDetailPage };
//# sourceMappingURL=item-detail.js.map