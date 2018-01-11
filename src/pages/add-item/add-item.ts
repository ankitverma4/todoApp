import { Component } from '@angular/core';
import { NavController, NavParams , ViewController, Platform, AlertController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

import { LocalNotifications } from '@ionic-native/local-notifications';
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

	oldTask;
	taskType;
	/*
	status of task
	false -> In-Queue
	true -> Completed
	*/
	status;

	
	constructor(public navCtrl: NavController,public navParams: NavParams , public view: ViewController, public dataService: DataProvider, public platform: Platform, public alertCtrl: AlertController, public localNotifications: LocalNotifications) {
	
		

	}

	// get data if for update
  	ionViewDidLoad() {
  		if(this.navParams.get('item')){

		  	this.taskType = this.navParams.get('taskType');
  			this.oldTask = this.navParams.get('item');
		  	
		  	this.title = this.oldTask.title;
		  	this.description = this.oldTask.description;
		  	this.taskDate = this.oldTask.taskDate;
		  	this.taskTime = this.oldTask.taskTime;
		  	this.status = this.oldTask.status;
		  	this.updateMode = true;
  		}
	}

	// save the task
	saveItem(){

		if(this.updateMode){
			if(this.title && this.taskDate && this.taskTime){
				let newItem = {
						item:{
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

			else{
				// show toast message
				this.dataService.showToast("bottom", "Title cannot be empty", 2500);
			}
		}

		else{
			if(this.title && this.taskDate && this.taskTime){
				let newItem = {
					title: this.title,
					description: this.description,
					taskDate: this.taskDate,
					taskTime: this.taskTime,
					status: false
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
