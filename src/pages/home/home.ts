import { Component } from '@angular/core';
import { NavController, ModalController, Platform, AlertController } from 'ionic-angular';

import { AddItemPage } from '../add-item/add-item';
import { ItemDetailPage } from '../item-detail/item-detail';

import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';

import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	public items =[];
	public completedTasks=[]; 
	public pendingTasks=[];
	public todayTasks = [];

	// notifications
	notifyTime: any;
    notifications: any[] = [];
    chosenHours: number;
    chosenMinutes: number;
    
	constructor(public navCtrl: NavController, public storage: Storage,public modalCtrl: ModalController, public dataService: DataProvider, public platform: Platform, public alertCtrl: AlertController, public localNotifications: LocalNotifications) {

		// check if storage have some data

		this.dataService.getData('current').then((data) => {
			if(data){
				this.todayTasks = data;
				this.addNotifications(this.todayTasks);
			}
		});
		this.dataService.getData('pending').then((data) => {
			if(data){
				this.pendingTasks = data;
			}
		});
		this.dataService.getData('completed').then((data) => {
			if(data){
				this.completedTasks = data;
			}
		});

	}

	// save or update item
	saveItem(index?:number, item?, taskType?){
		var saveModal;
		if(item){
			saveModal = this.modalCtrl.create(AddItemPage, {item: item, index: index, taskType: taskType});
			saveModal.onDidDismiss((item) => {
				if(item){
					switch (item.taskType) {
						case "current":
							if(this.compareDate(item.item.taskDate)){
								this.todayTasks[item.index] = item.item;
								this.addNotifications(this.todayTasks);

								this.dataService.saveData('current',this.todayTasks);

							}
							else{
								this.pendingTasks.push(item.item);
								this.todayTasks.splice(item.index,1);
								this.addNotifications(this.todayTasks);

								this.dataService.saveData('pending',this.pendingTasks);
								this.dataService.saveData('current',this.todayTasks);

							}
							break;

						case "pending":
							if(this.compareDate(item.item.taskDate)){
									this.todayTasks.push(item.item);
									this.pendingTasks.splice(item.index,1);
									this.addNotifications(this.todayTasks);
									
									this.dataService.saveData('current',this.todayTasks);
									this.dataService.saveData('pending',this.pendingTasks);
								}
								else{
									this.pendingTasks[item.index] = item.item;
									this.dataService.saveData('pending',this.pendingTasks);
								}

							break;

						case "completed":
							this.completedTasks[item.index] = item.item;
							this.dataService.saveData('completed',this.completedTasks);

							break;
						
						default:
							// code...
							break;
					}
				}
			});
			saveModal.present();
		}

		else{
			saveModal = this.modalCtrl.create(AddItemPage);

			saveModal.onDidDismiss((item) => {
				if(item){
					if(this.compareDate(item.taskDate)){
						this.todayTasks.push(item);
						this.addNotifications(this.todayTasks);

						this.dataService.saveData('current',this.todayTasks);
					}
					else{
						this.pendingTasks.push(item);
						this.dataService.saveData('pending',this.pendingTasks);
					}
				}
			});
			saveModal.present();
		}
	}

	// view task on other page
	viewItem(item, index, taskType){

		var detailModal = this.modalCtrl.create(ItemDetailPage, {item: item, index: index, taskType:taskType});
		detailModal.onDidDismiss((item) => {
			// update status
			if(item){
				switch (item.taskType) {
					case "current":
						this.todayTasks[item.index].status = !this.todayTasks[item.index].status;
						this.completedTasks.push(this.todayTasks[item.index]);
						this.todayTasks.splice(item.index,1);

						this.addNotifications(this.todayTasks);

						this.dataService.saveData('completed',this.completedTasks);
						this.dataService.saveData('current',this.todayTasks);
						break;

					case "pending":
						this.pendingTasks[item.index].status = !this.pendingTasks[item.index].status;
						this.completedTasks.push(this.pendingTasks[item.index]);
						this.pendingTasks.splice(item.index,1);
						this.dataService.saveData('completed',this.completedTasks);
						this.dataService.saveData('pending',this.pendingTasks);
						break;

					case "completed":
						this.completedTasks[item.index].status = !this.completedTasks[item.index].status;

						if(this.compareDate(this.completedTasks[item.index].taskDate)){
							this.todayTasks.push(this.completedTasks[item.index]);
							this.addNotifications(this.todayTasks);
							
							this.completedTasks.splice(item.index,1);
							this.dataService.saveData('current',this.todayTasks);
						}
						else{
							this.pendingTasks.push(this.completedTasks[item.index]);
							this.completedTasks.splice(item.index,1);
							this.dataService.saveData('pending',this.pendingTasks);
						}
						this.dataService.saveData('completed',this.completedTasks);
						break;
					
					default:
						// code...
						break;
				}
			}
		});
		detailModal.present();
	}

	// delete task
	delete(index: number, type){
		switch (type) {
			case "current":
				this.todayTasks.splice(index,1);
				this.addNotifications(this.todayTasks);
				this.dataService.saveData('current',this.todayTasks);
				break;

			case "pending":
				this.pendingTasks.splice(index,1);
				this.dataService.saveData('pending',this.pendingTasks);

				break;

			case "completed":
				this.completedTasks.splice(index,1);
				this.dataService.saveData('completed',this.completedTasks);
				break;
			default:
				// code...
				break;
		}
	}

	compareDate(x){
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();

		var newMM, newDD;

		if(dd<10) {
		    newDD = ('0'+dd).toString();
		}
		else{
			newDD = dd;
		} 

		if(mm<10) {
		    newMM = ('0'+mm).toString();
		}
		else{
			newMM = mm;
		} 

		var date = yyyy + '-' + newMM + '-' + newDD;
		return (x == date);
	}

	addNotifications(todayTasks){
		if(todayTasks.length){
			todayTasks.forEach((task, index) => {
				
				let notificationTime = new Date();
				if(notificationTime.getHours())
				notificationTime.setHours(parseInt(task.taskTime.slice(0,2)));
	            notificationTime.setMinutes(parseInt(task.taskTime.slice(3,5)));
				let notification = {
	                id: index,
	                title: 'Pending Task',
	                text: task.title,
	                at: notificationTime
	            };
	            this.notifications.push(notification);
			})
			if(this.platform.is('cordova')){
	 
		        // Cancel any existing notifications
		        this.localNotifications.cancelAll().then(() => {
		 
		            // Schedule the new notifications
		            this.localNotifications.schedule(this.notifications);
		            this.notifications = [];
		 
		            /*let alert = this.alertCtrl.create({
		                title: 'Notifications set',
		                buttons: ['Ok']
		            });
		 
		            alert.present();*/
		 
		        });
		 
		    }
		}
	}
}
