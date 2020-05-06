import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ImagemHomeDestinoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-imagem-home-destino',
  templateUrl: 'imagem-home-destino.html',
})
export class ImagemHomeDestinoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImagemHomeDestinoPage');
  }

  Ir () {
    this.navCtrl.push("CardapioPage");
  }

}
