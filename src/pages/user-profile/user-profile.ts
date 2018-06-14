import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {
  user: any;
  email: string;
  categories;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    let user = this.navParams.get('user');
    this.storage.get('questions').then((questions) => {
      let newuser = questions.filter((el) => {
        if (el.user.id == user) {
          return el.user;
        }
      });
      this.user = newuser[0].user;
      console.log(this.formatEmail(this.user.email));
      this.email = this.formatEmail(this.user.email);
      if (this.user.category !== null) {
        this.categories = this.user.category.split(',');
      }
    })
  }

  formatEmail(email) {
    let censorWord = function (str) {
      return str[0] + "*".repeat(str.length - 2) + str.slice(-1);
    }

    let arr = email.split("@");
    return censorWord(arr[0]) + "@" + arr[1];
  }


}
