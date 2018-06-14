import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmailRegisterPage } from './email-register';

@NgModule({
  declarations: [
    EmailRegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(EmailRegisterPage),
  ],
})
export class EmailRegisterPageModule {}
