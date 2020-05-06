import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CupidoPage } from './cupido';

@NgModule({
  declarations: [
    CupidoPage,
  ],
  imports: [
    IonicPageModule.forChild(CupidoPage),
  ],
})
export class CupidoPageModule {}
