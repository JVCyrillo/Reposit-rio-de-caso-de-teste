import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OpcaoescPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-opcaoesc',
  templateUrl: 'opcaoesc.html',
})
export class OpcaoescPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OpcaoescPage');
  }

  Vai() {
    this.navCtrl.push("ContopcaoescPage");
  }

}
