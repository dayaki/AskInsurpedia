import { MomentModule } from 'ngx-moment';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyActivityPage } from './my-activity';

@NgModule({
  declarations: [
    MyActivityPage,
  ],
  imports: [
    IonicPageModule.forChild(MyActivityPage),
    MomentModule
  ],
})
export class MyActivityPageModule {}
