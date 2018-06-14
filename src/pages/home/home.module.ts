import { TruncateModule } from '@yellowspot/ng-truncate';
import { MomentModule } from 'ngx-moment';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    MomentModule,
    TruncateModule
  ],
})
export class HomePageModule {}
