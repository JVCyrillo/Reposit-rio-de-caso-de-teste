import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import * as firebase from 'firebase'

/**
 * Generated class for the EsqueceusenhaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-esqueceusenha',
  templateUrl: 'esqueceusenha.html',
})
export class EsqueceusenhaPage {

  strEmail: string;

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
  }

  recoverPassword() {
    if (this.strEmail != undefined && this.strEmail != '') {
      firebase.auth().sendPasswordResetEmail(this.strEmail).then(() => {
        this.showAlert('Recuperar Senha', 'Enviamos um link para o seu email com os próximos passos.')
      }).catch(() => {
        this.showAlert("Erro!", "Não foi possível lhe enviar o link para a redefinição da senha.")
      })
    } else {
      this.showAlert('Erro', 'Por favor, insira seu endereço de e-mail')
    }
  }

  showAlert(title: string, message: string) {
    const alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel'
        }
      ]
    })
    alert.present()
  }


  
  ionViewDidLoad() {
    console.log('ionViewDidLoad EsqueceusenhaPage');
  }

  

}
