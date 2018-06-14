import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FirstTimeOptionsPage } from './first-time-options';

@NgModule({
  declarations: [
    FirstTimeOptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(FirstTimeOptionsPage),
  ],
})
export class FirstTimeOptionsPageModule {}
