import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  constructor(public storage: Storage, public toastCtrl: ToastController) {
  }

  // get data from storage
  getData(){
  	return this.storage.get('todos');
  }

  // save data in storage
  saveData(data){
  	this.storage.set('todos',data);
  }

  // show toast message
  showToast(position, message, duration){
    this.toastCtrl.create({
      position: position,
      message: message,
      duration: duration
    }).present();
  }

}
