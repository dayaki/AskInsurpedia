import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ModalController, Slides } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  @ViewChild('slider') slider: Slides;
  slides = [
    {
      name: 'Kayode Olatunbosun',
      position: 'Chartered Financial Analyst',
      imageUrl: 'assets/img/profile2.jpg'
    },
    {
      name: 'Ayodele Iyun',
      position: 'Experienced Insurance Professional',
      imageUrl: 'assets/img/profile3.jpg'
    },
    {
      name: 'Ayodeji Folorunso',
      position: 'Experienced Insurance Professional',
      imageUrl: 'assets/img/profile1.jpg'
    }
  ];
  user: any;
  questions: any;
  hasContent: Boolean = false;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public storage: Storage, public http: HttpClient) {}

  ionViewWillEnter() {
    this.storage.get('user').then((user) => {
      this.user = user;
    });

    this.storage.get('questions').then((questions) => {
      if (questions !== null) {
        console.log(questions)
        this.questions = questions;
        this.hasContent = true;
      } else {
        this.http.get('http://sprypixels.com/demo/askinsurpedia/public/api/questions/all').subscribe((data) => {
          this.questions = data;
          console.log(data)
          this.storage.set('questions', data);
          this.hasContent = true;
        });
      }
    });
  }

  search() {
    this.navCtrl.push('SearchPage');
  }

  askQuestion() {
    this.navCtrl.push('AskQuestionPage');
  }

  viewUser(user) {
    this.navCtrl.push('UserProfilePage', { user });
  }

  details(question) {
    this.navCtrl.push('QuestionDetailsPage', { question });
  }

}
