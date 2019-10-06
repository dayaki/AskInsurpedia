import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormBuilder } from "@angular/forms";
import { IonicPage, NavController, NavParams, ToastController, Events } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {
  @ViewChild('focusInput') myInput ;
  comment: FormControl;
  data: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public http: HttpClient, public events: Events, private keyboard: Keyboard, private formBuilder: FormBuilder) {
    this.data = this.navParams.get('data');
  }

  // ionViewDidEnter() {
  //   setTimeout(() => {
  //     this.keyboard.show();
  //     this.myInput.setFocus();
  //   }, 150);
  // }

  ionViewWillLoad() {
    this.comment = this.formBuilder.control('');
  }

  postComment() {
    if (this.comment === undefined || this.comment.value === '') {
      let toast = this.toastCtrl.create({
        message: "Your comment cannot be blank.",
        position: "bottom",
        duration: 3500
      });
      toast.present();
    } else {
      const data = {
        comment: this.comment.value,
        user: {
          fname: this.data.fname,
          lname: this.data.lname,
          photo: this.data.photo,
          created_at: new Date()
        }
      };
      this.events.publish('comment:created', data);
      this.navCtrl.pop();
    }
  }

}
