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
import { DataProvider } from '../../providers/data/data';
/**
 * Generated class for the AddItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AddItemPage = /** @class */ (function () {
    function AddItemPage(navCtrl, navParams, view, dataService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.view = view;
        this.dataService = dataService;
        this.updateMode = false;
    }
    // get data if for update
    AddItemPage.prototype.ionViewDidLoad = function () {
        if (this.navParams.get('item')) {
            this.taskType = this.navParams.get('taskType');
            this.oldTask = this.navParams.get('item');
            this.title = this.oldTask.title;
            this.description = this.oldTask.description;
            this.taskDate = this.oldTask.taskDate;
            this.taskTime = this.oldTask.taskTime;
            this.status = this.oldTask.status;
            this.updateMode = true;
        }
    };
    // save the task
    AddItemPage.prototype.saveItem = function () {
        if (this.updateMode) {
            if (this.title) {
                var newItem = {
                    item: {
                        title: this.title,
                        description: this.description,
                        taskDate: this.taskDate,
                        taskTime: this.taskTime,
                        status: this.status
                    },
                    index: this.navParams.get('index'),
                    taskType: this.taskType
                };
                this.view.dismiss(newItem);
            }
            else {
                // show toast message
                this.dataService.showToast("bottom", "Title cannot be empty", 2500);
            }
        }
        else {
            if (this.title) {
                var newItem = {
                    title: this.title,
                    description: this.description,
                    taskDate: this.taskDate,
                    taskTime: this.taskTime,
                    status: false
                };
                this.view.dismiss(newItem);
            }
            else {
                // show toast message
                this.dataService.showToast("bottom", "Title cannot be empty", 2500);
            }
        }
    };
    // close the add task modal
    AddItemPage.prototype.close = function () {
        this.view.dismiss();
    };
    AddItemPage = __decorate([
        Component({
            selector: 'page-add-item',
            templateUrl: 'add-item.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, ViewController, DataProvider])
    ], AddItemPage);
    return AddItemPage;
}());
export { AddItemPage };
//# sourceMappingURL=add-item.js.map