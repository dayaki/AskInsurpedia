import { Keyboard } from '@ionic-native/keyboard';
import { Storage } from '@ionic/storage';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  @ViewChild('searchBar') myInput ;
  searchString: String;
  questions = [];
  allQuestions: any;
  hasContent: Boolean = false;

  constructor(public navCtrl: NavController, public storage: Storage, private keyboard: Keyboard) {
    this.storage.get('questions').then((questions) => {
      this.allQuestions = questions;
    });
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.keyboard.show();
      this.myInput.setFocus();
    }, 150);
  }

  onInput() {
    if (this.searchString === '') {
      this.questions = [];
    } else {
      const searchTerm = this.searchString.toLowerCase();
      this.questions = this.allQuestions.filter(function(el) {
        return el.question.toLowerCase().includes(searchTerm) || el.category.toLowerCase().includes(searchTerm);
      }.bind(this));
      this.hasContent = true;
    }
  }

  onCancel() {
    this.questions = [];
    this.searchString = '';
    this.hasContent = false;
  }

  details(question) {
    this.navCtrl.push('QuestionDetailsPage', { question })
  }

}
