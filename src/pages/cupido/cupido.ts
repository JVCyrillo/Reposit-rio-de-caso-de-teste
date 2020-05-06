import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the CupidoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cupido',
  templateUrl: 'cupido.html',
})


export class CupidoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  

  Vai() {
    this.navCtrl.push("CupidoPage");
  }
  
  Vaii() {
    this.navCtrl.push("HomePage");
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad CupidoPage');
  }

  
  shownGroup = null;
  toggleGroup(group) {
      if (this.isGroupShown(group)) {
          this.shownGroup = null;
      } else {
          this.shownGroup = group;
      }
  };
  isGroupShown(group) {
      return this.shownGroup === group;
  };

  snowGroupp = null;
  toggleGroupp(group) {
      if (this.isGrouppShown(group)) {
          this.shownGroup = null;
      } else {
          this.shownGroup = group;
      }
  };
  isGrouppShown(group) {
      return this.shownGroup === group;
  };

}


