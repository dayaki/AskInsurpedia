import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TipsPage } from './tips';
import { TruncateModule } from '@yellowspot/ng-truncate';

@NgModule({
  declarations: [
    TipsPage,
  ],
  imports: [
    IonicPageModule.forChild(TipsPage),
    TruncateModule
  ],
})
export class TipsPageModule {}
