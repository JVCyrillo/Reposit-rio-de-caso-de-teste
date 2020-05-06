import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, MenuController, LoadingController, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
import { AuthServiceProvider } from '../../providers/auth/auth-service';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html'
})

export class CadastroPage {

  strNome: string;
  strCpf: string;
  strDataNasc: string;  
  strCidade: string;
  strEstado: string;
  
  strBio: string;

  generoValue: string;

  strEmail: string;
  strPass: string;
  strCnfPass: string;

 

  

  termsAcceptedValue = false;

  

  constructor(private menu: MenuController, private navCtrl: NavController, public menuCtrl: MenuController, private viewCtrl: ViewController, public loadingCtrl: LoadingController, public alertCtrl: AlertController, private authService: AuthServiceProvider, public storage: Storage) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');

  }
  ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }
  ionViewWillLeave() {
    this.menu.swipeEnable(true);
  }

  goToHome() {
    this.navCtrl.push('HomePage')
  }

  moveToLogin() {
    this.navCtrl.pop()
  }

  
  registrar() {
    if (this.termsAcceptedValue) {
      // console.log(this.beMentor);
      if (this.strEmail != undefined && this.strPass != undefined) {
        if (this.strPass == this.strCnfPass) {
          
          // Build user data
          var userData = {
            avatar: '../../assets/imgs/avatar2.png',
            email: this.strEmail,
            nome: this.strNome,
            datanasc: this.strDataNasc,            
            bio: this.strBio,
            cidade: this.strCidade,
            estado: this.strEstado,            
            role: 'user'
          }

          if (this.strCpf != undefined) userData['cpf'] = this.strCpf
          if (this.strCidade != undefined) userData['cidade'] = this.strCidade
          if (this.strEstado != undefined) userData['estado'] = this.strEstado
          if (this.strDataNasc != undefined) userData['datanasc'] = this.strDataNasc
          if (this.generoValue != undefined) userData['genero'] = this.generoValue

          console.log(this.strEmail, this.strPass);
          this.createAccount(userData)         
            if (this.strNome != undefined && this.strDataNasc != undefined) {
              this.createAccount(userData)
            } else {
              this.showAlert('Erro', 'Preencha seu nome e data nascimento')            
          }
        } else {
          this.showAlert('Erro', 'Suas senhas não coincidem')
        }
      } else {
        this.showAlert('Erro', 'Preenchar seu email e senha')
      }
    } else {
      this.showAlert('Erro', 'Você precisa aceitar os termos.')
    }
  }




  


  createAccount(userData) {
    const loading = this.loadingCtrl.create({
      content: 'Criando a conta...'
    })
    loading.present()

    this.authService.doRegister(this.strEmail, this.strPass, userData).then(() => {
      this.storage.set('credentials', { email: this.strEmail, password: this.strPass })

      loading.dismiss()
      this.menuCtrl.enable(true)
      this.navCtrl.setRoot('HomePage')
    }).catch((error) => {
      loading.dismiss()
      console.log(error)
    })
  }

  showAlert(title: string, message: string) {
    this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: () => {}
        }
      ]
    })
  }

  
  

 

}
