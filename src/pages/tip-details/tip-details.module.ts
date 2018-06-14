import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TipDetailsPage } from './tip-details';

@NgModule({
  declarations: [
    TipDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(TipDetailsPage),
  ],
})
export class TipDetailsPageModule {}
