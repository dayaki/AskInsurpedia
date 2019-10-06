import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommentPage } from './comment';
import { RichTextComponentModule } from '../../components/rich-text/rich-text.module';

@NgModule({
  declarations: [
    CommentPage,
  ],
  imports: [
    IonicPageModule.forChild(CommentPage),
    RichTextComponentModule
  ],
})
export class CommentPageModule {}
