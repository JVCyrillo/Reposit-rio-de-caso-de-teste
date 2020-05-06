import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController, MenuController, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase'
import { Storage } from '@ionic/storage'
import { CredentialsModel } from '../models/User';
import { AuthServiceProvider } from '../providers/auth/auth-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  perfil: object = {    
    nome: 'Nome',
    datansc: 'x',

    }
  
  @ViewChild(Nav) nav: Nav;

  credentials = {} as CredentialsModel
  rootPage: any = 'LoginPage';

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public menuCtrl: MenuController, public storage: Storage, public loadingCtrl: LoadingController, public authService: AuthServiceProvider, private toastCtrl: ToastController) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      let user = firebase.auth().currentUser
       if (user) {
      this.authService.getCurrentUser().then((userData: object) => {
        console.log(userData)
        this.perfil = userData;
      }
    )}  

      this.storage.get('credentials').then((val) => {
        if (val != null && val != undefined) {
          if (val.email != null && val.email != undefined && val.email != '' && val.password != null && val.password != undefined && val.password != '') {
            this.credentials = val
            this.doLoginWithCredentials()          
            console.log(this.perfil)
            

          }
        }
      })

      
    });
  }

  doLoginWithCredentials() {
    let loader = this.loadingCtrl.create({
      content: 'Aguarde, por favor...'
    })
    loader.present()

    this.authService.doLogin(this.credentials.email, this.credentials.password).then(() => {
      loader.dismiss()
      this.menuCtrl.enable(true)
      this.nav.setRoot('HomePage')
    }).catch((error) => {
      loader.dismiss()
      this.presentToast(error)
    })
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page);
  }

  logOut() {
    this.credentials.email = ''
    this.credentials.password = ''
    this.storage.set('credentials', this.credentials)
    firebase.auth().signOut()
    this.nav.setRoot('LoginPage')
    console.log("Conta desvinculada");
  }

}
  

