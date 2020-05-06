import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';


import { MyApp } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule} from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { environment } from './environments/environment'


import { AuthServiceProvider} from '../providers/auth/auth-service';
import * as firebase from 'firebase';
import { IonicStorageModule } from '@ionic/storage';
firebase.initializeApp(environment.firebase)


















@NgModule({
  declarations: [
    MyApp,
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase),
    IonicStorageModule.forRoot(),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    
    HttpClientModule,
    HttpModule
    
    



  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},    
    AngularFireDatabase,
    AngularFireAuth,
    AuthServiceProvider,
   
    
    
    
    
    
  ]
})
export class AppModule {}
