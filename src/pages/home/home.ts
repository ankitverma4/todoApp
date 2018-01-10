import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { AddItemPage } from '../add-item/add-item';
import { ItemDetailPage } from '../item-detail/item-detail';

import { DataProvider } from '../../providers/data/data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	public items =[];

	constructor(public navCtrl: NavController, public modalCtrl: ModalController, public dataService: DataProvider) {

		this.dataService.getData().then((data) => {
			if(data){
				this.items = data;
			}
		})
	}

	// save or update item
	saveItem(index?:number, item?){
		var saveModal;
		if(item){
			saveModal = this.modalCtrl.create(AddItemPage, {item: item, index: index});
			saveModal.onDidDismiss((item) => {
				if(item){
					this.items[index] = item.item;
					this.dataService.saveData(this.items);
				}
			});
			saveModal.present();
		}

		else{
			saveModal = this.modalCtrl.create(AddItemPage);

			saveModal.onDidDismiss((item) => {
				if(item){
					this.items.push(item);
					this.dataService.saveData(this.items);
				}
			});
			saveModal.present();
		}
	}

	// view task on other page
	viewItem(item){
		this.navCtrl.push(ItemDetailPage, {
			item: item
		});
	}
	// delete task
	delete(index: number, item?){
			this.items.splice(index,1);
			this.dataService.saveData(this.items);
	}
}
