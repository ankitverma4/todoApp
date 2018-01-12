import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController } from 'ionic-angular';

import { AddItemPage } from '../add-item/add-item';
/**
 * Generated class for the ItemDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html',
})
export class ItemDetailPage {
	public item;
	index;
	taskType;
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public view: ViewController) {
  	this.item = this.navParams.get('item');
  	this.index = this.navParams.get('index');
  	this.taskType = this.navParams.get('taskType');
  	console.log(this.item,'item from view page');
  }

  ionViewDidLoad() {
  	// fetch task to show
  }

  completed(event: any): void{
  	var data = {
  		item:{
			title: this.item.title,
			description: this.item.description,
			taskDate: this.item.taskDate,
			taskTime: this.item.taskTime,
			status: 1
		},
  		index: this.index,
  		taskType: this.taskType,
  		status: 1
  	}
  	this.view.dismiss(data);
  }

  	close(){
		this.view.dismiss();
	}

	reschedule(){
		var updateModal = this.modalCtrl.create(AddItemPage, {item: this.item, index: this.index, taskType: this.taskType});
		updateModal.onDidDismiss((item) => {
			if(item){
				console.log(item, 'update modal');
				item.item.status = 0;
				item.status = 0;
				this.view.dismiss(item);
			}
			else{
				this.view.dismiss();
			}
		});
		updateModal.present();
	}
}


