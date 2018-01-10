import { Component } from '@angular/core';
import { NavController, NavParams , ViewController, ToastController } from 'ionic-angular';

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

	updateMode: boolean = false;
	constructor(public navCtrl: NavController,public navParams: NavParams ,public view: ViewController, public toastCtrl: ToastController) {
	}

  	ionViewDidLoad() {
  		if(this.navParams.get('item')){
  			var temp = this.navParams.get('item')
		  	this.title = temp.title;
		  	this.description = temp.description;
		  	this.taskDate = temp.taskDate;
		  	this.updateMode = true;
  		}
	}

	saveItem(){
		if(this.updateMode){
			
			let newItem = {
					item:{
						title: this.title,
						description: this.description,
						taskDate: this.taskDate,
					},
					index: this.navParams.get('index')
				};

			this.view.dismiss(newItem);
		}

		else{
			if(this.title){
				let newItem = {
					title: this.title,
					description: this.description,
					taskDate: this.taskDate
				};
				this.view.dismiss(newItem); 
			}

			else{
				let toast = this.toastCtrl.create({

					position: 'bottom',
					message: "Title cannot be empty.",
					duration: 3000
				})
				toast.present();
			}
		}

	}

	close(){
		this.view.dismiss();
	}
}
