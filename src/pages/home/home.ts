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

	addItem(){
		let addMdal = this.modalCtrl.create(AddItemPage);

		addMdal.onDidDismiss((item) => {
			if(item){
				this.items.push(item);
				this.dataService.saveData(this.items);
			}
		});
		addMdal.present();
	}

	viewItem(item){
		this.navCtrl.push(ItemDetailPage, {
			item: item
		});
	}

	options(index: number, item?){
		if(item){
			let addMdal = this.modalCtrl.create(AddItemPage, {item: item, index: index});
			addMdal.onDidDismiss((item) => {
				if(item.index){
					this.items[index] = item.item;
					this.dataService.saveData(this.items);
				}
			});
			addMdal.present();
		}
		else{
			this.items.splice(index,1);
			this.dataService.saveData(this.items);
		}
	}
}
