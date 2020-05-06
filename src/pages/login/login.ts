import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController, LoadingController, ViewController, Nav } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase'
import { AuthServiceProvider } from '../../providers/auth/auth-service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  strEmail: string;
  strPassword: string;

  passwordtype: string = 'password';
  passeye: string = 'eye';

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, private toastCtrl: ToastController, private viewCtrl: ViewController, public loadingCtrl: LoadingController, private storage: Storage, private authService: AuthServiceProvider) { }

  ionViewDidLoad() {
    this.menuCtrl.enable(false);
  }
  forgePassword() {

  }
  presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
  recuperarSenha() {
    this.navCtrl.push('EsqueceusenhaPage');
  }

  doLogin() {
    if (this.strEmail != undefined && this.strPassword != undefined) {
      const loading = this.loadingCtrl.create({
        content: "Entrando...",
      })
      loading.present();
      this.authService.doLogin(this.strEmail, this.strPassword).then(() => {

        this.authService.getCurrentUser().then((user) => {
          console.log(user)
        })

        this.storage.set('credentials', { email: this.strEmail, password: this.strPassword })
        
        loading.dismiss()        
        this.menuCtrl.enable(true)
        this.navCtrl.setRoot('TelaPrincipalPage')
      }).catch((error) => {
        loading.dismiss()
        console.log('Erro ao fazer login')
        console.log(error)
      })
    } else {
      console.log("Por favor, preencha seu email e sua senha")
    }
  }

  doSignup() {
    this.navCtrl.push('CadastroPage');
  }

  managePassword() {
    if (this.passwordtype == 'password') {
      this.passwordtype = 'text';
      this.passeye = 'eye-off';
    } else {
      this.passwordtype = 'password';
      this.passeye = 'eye';
    }
  }
  
}