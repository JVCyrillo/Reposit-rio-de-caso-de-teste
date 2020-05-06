import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ContopcaoescPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contopcaoesc',
  templateUrl: 'contopcaoesc.html',
})
export class ContopcaoescPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContopcaoescPage');
  }

  Irpagamento () {
    this.navCtrl.push("PagamentosPage");
  }

  Ir() {
    this.navCtrl.push("CardapioPage");
  }

}
