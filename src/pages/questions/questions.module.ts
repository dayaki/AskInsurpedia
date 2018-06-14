import { MomentModule } from 'ngx-moment';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuestionsPage } from './questions';

@NgModule({
  declarations: [
    QuestionsPage,
  ],
  imports: [
    IonicPageModule.forChild(QuestionsPage),
    MomentModule
  ],
})
export class QuestionsPageModule {}
