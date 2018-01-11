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
import { NavController, ModalController } from 'ionic-angular';
import { AddItemPage } from '../add-item/add-item';
import { ItemDetailPage } from '../item-detail/item-detail';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, storage, modalCtrl, dataService) {
        // check if storage have some data
        var _this = this;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.modalCtrl = modalCtrl;
        this.dataService = dataService;
        this.items = [];
        this.completedTasks = [];
        this.pendingTasks = [];
        this.todayTasks = [];
        this.date = new Date();
        this.dataService.getData('current').then(function (data) {
            if (data) {
                _this.todayTasks = data;
            }
        });
        this.dataService.getData('pending').then(function (data) {
            if (data) {
                _this.pendingTasks = data;
            }
        });
        this.dataService.getData('completed').then(function (data) {
            if (data) {
                _this.completedTasks = data;
            }
        });
    }
    // save or update item
    HomePage.prototype.saveItem = function (index, item, taskType) {
        var _this = this;
        var saveModal;
        if (item) {
            saveModal = this.modalCtrl.create(AddItemPage, { item: item, index: index, taskType: taskType });
            saveModal.onDidDismiss(function (item) {
                switch (item.taskType) {
                    case "current":
                        if (_this.compareDate(item.item.taskDate)) {
                            _this.todayTasks[item.index] = item.item;
                            _this.dataService.saveData('current', _this.todayTasks);
                        }
                        else {
                            _this.pendingTasks.push(item.item);
                            _this.todayTasks.splice(item.index, 1);
                            _this.dataService.saveData('pending', _this.pendingTasks);
                            _this.dataService.saveData('current', _this.todayTasks);
                        }
                        break;
                    case "pending":
                        _this.pendingTasks[item.index] = item.item;
                        _this.dataService.saveData('pending', _this.pendingTasks);
                        break;
                    case "completed":
                        _this.completedTasks[item.index] = item.item;
                        _this.dataService.saveData('completed', _this.completedTasks);
                        break;
                    default:
                        // code...
                        break;
                }
            });
            saveModal.present();
        }
        else {
            saveModal = this.modalCtrl.create(AddItemPage);
            saveModal.onDidDismiss(function (item) {
                if (item) {
                    if (_this.compareDate(item.taskDate)) {
                        _this.todayTasks.push(item);
                        _this.dataService.saveData('current', _this.todayTasks);
                    }
                    else {
                        _this.pendingTasks.push(item);
                        _this.dataService.saveData('pending', _this.pendingTasks);
                    }
                }
            });
            saveModal.present();
        }
    };
    // view task on other page
    HomePage.prototype.viewItem = function (item, index, taskType) {
        // this.navCtrl.push(ItemDetailPage, {
        // 	item: item,
        // 	index: index,
        // 	callback: this.updateStatus
        // });
        var _this = this;
        var detailModal = this.modalCtrl.create(ItemDetailPage, { item: item, index: index, taskType: taskType });
        detailModal.onDidDismiss(function (item) {
            console.log(item);
            switch (item.taskType) {
                case "current":
                    if (_this.compareDate(item.item.taskDate)) {
                        _this.todayTasks[item.index].status = !_this.todayTasks[item.index].status;
                        _this.dataService.saveData('current', _this.todayTasks);
                    }
                    else {
                        _this.pendingTasks.push(item.item);
                        _this.todayTasks.splice(item.index, 1);
                        _this.dataService.saveData('pending', _this.pendingTasks);
                        _this.dataService.saveData('current', _this.todayTasks);
                    }
                    break;
                case "pending":
                    _this.pendingTasks[item.index] = item.item;
                    _this.dataService.saveData('pending', _this.pendingTasks);
                    break;
                case "completed":
                    _this.completedTasks[item.index] = item.item;
                    _this.dataService.saveData('completed', _this.completedTasks);
                    break;
                default:
                    // code...
                    break;
            }
        });
        detailModal.present();
    };
    // delete task
    HomePage.prototype.delete = function (index, type) {
        switch (type) {
            case "current":
                this.todayTasks.splice(index, 1);
                this.dataService.saveData('current', this.todayTasks);
                break;
            case "pending":
                this.pendingTasks.splice(index, 1);
                this.dataService.saveData('pending', this.pendingTasks);
                break;
            case "completed":
                this.completedTasks.splice(index, 1);
                this.dataService.saveData('completed', this.completedTasks);
                break;
            default:
                // code...
                break;
        }
    };
    HomePage.prototype.updateStatus = function (item, index) {
        return new Promise(function (resolve, reject) {
            console.log("updates");
            console.log(index);
            this.items[index].status = item.status;
        });
    };
    HomePage.prototype.filterTasks = function (items) {
        var _this = this;
        items.forEach(function (item) {
            if (item.status) {
                _this.completedTasks.push(item);
            }
            else if (_this.compareDate(item.taskDate)) {
                _this.todayTasks.push(item);
            }
            else {
                _this.pendingTasks.push(item);
            }
        });
    };
    HomePage.prototype.compareDate = function (x) {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = ('0' + dd).toString();
        }
        if (mm < 10) {
            mm = ('0' + mm).toString();
        }
        var date = yyyy + '-' + mm + '-' + dd;
        return (x == date);
    };
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        }),
        __metadata("design:paramtypes", [NavController, Storage, ModalController, DataProvider])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map