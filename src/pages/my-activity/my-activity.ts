import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-my-activity',
  templateUrl: 'my-activity.html',
})
export class MyActivityPage {
  hasActivity: Boolean = false;
  questions: any;

  constructor(public navCtrl: NavController, public storage: Storage) {
    this.storage.get('user').then((userData) => {
      this.storage.get('questions').then((questions) => {
        this.questions = questions.filter((el) => {
          if (el.user_id == userData.id) {
            return el;
          }
        });
        if (this.questions.length > 0) {
          this.hasActivity = true;
        }
      });
    });
  }

  details(question) {
    this.navCtrl.push('QuestionDetailsPage', { question });
  }

}
