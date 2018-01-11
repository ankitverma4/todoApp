import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController) {
  	this.item = this.navParams.get('item');
  	this.index = this.navParams.get('index');
  	this.taskType = this.navParams.get('taskType');
  }

  ionViewDidLoad() {
  	// fetch task to show
  }

  changeStatus(event: any): void{
  	var data = {
  		index: this.index,
  		taskType: this.taskType
  	}
  	this.view.dismiss(data);
  }

  	close(){
		this.view.dismiss();
	}
}


