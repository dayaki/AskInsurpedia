import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RichTextComponent } from './rich-text';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RichTextComponent,
  ],
  imports: [
    IonicPageModule.forChild(RichTextComponent),
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    RichTextComponent
  ]
})
export class RichTextComponentModule {}
