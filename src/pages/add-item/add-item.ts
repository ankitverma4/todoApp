import { Component } from '@angular/core';
import { NavController, NavParams , ViewController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
/**
 * Generated class for the AddItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html',
})
export class AddItemPage {

	title: string;
	description: string;
	taskDate: string;
	taskTime: string;

	updateMode: boolean = false;

	constructor(public navCtrl: NavController,public navParams: NavParams ,public view: ViewController, public dataService: DataProvider) {
	}

	// get data if for update
  	ionViewDidLoad() {
  		if(this.navParams.get('item')){
  			var temp = this.navParams.get('item')
		  	this.title = temp.title;
		  	this.description = temp.description;
		  	this.taskDate = temp.taskDate;
		  	this.taskTime = temp.taskTime;
		  	this.updateMode = true;
  		}
	}

	// save the task
	saveItem(){
		if(this.updateMode){
			if(this.title){
				let newItem = {
						item:{
							title: this.title,
							description: this.description,
							taskDate: this.taskDate,
							taskTime: this.taskTime
						},
						index: this.navParams.get('index')
					};

				this.view.dismiss(newItem);
			}

			else{
				// show toast message
				this.dataService.showToast("bottom", "Title cannot be empty", 2500);
			}
		}

		else{
			if(this.title){
				let newItem = {
					title: this.title,
					description: this.description,
					taskDate: this.taskDate,
					taskTime: this.taskTime
				};
				this.view.dismiss(newItem); 
			}

			else{
				// show toast message
				this.dataService.showToast("bottom", "Title cannot be empty", 2500);
			}
		}

	}

	// close the add task modal
	close(){
		this.view.dismiss();
	}
}
