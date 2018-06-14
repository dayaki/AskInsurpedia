import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';

@IonicPage()
@Component({
  selector: 'page-topics',
  templateUrl: 'topics.html',
})
export class TopicsPage {
  user: any;
  categories = [
    { name: 'Insurance', checked: false }, 
    { name: 'Annuity and Investments', checked: false },
    { name: 'Contracts and Liabilities', checked: false }, 
    { name: 'Wills and Trusts', checked: false }, 
    { name: 'Pensions', checked: false }
  ];

  constructor(public navCtrl: NavController, public storage: Storage, public http: HttpClient, public toast: Toast) {
    this.storage.get('user').then((user) => {
      this.user = user.id;
      let category = user.category.split(',');
      category.forEach(elem => {
        let foundIndex = this.categories.findIndex(x => x.name == elem);
        this.categories[foundIndex] = { name: elem, checked: true };
      });
    });
  }

  onChange(category, isChecked: boolean) {
    if (isChecked) {
      let index = this.categories.findIndex(x => x.name == category.name);
      this.categories[index] = {name: category.name, checked: true};
    } else {
      let index = this.categories.findIndex(x => x.name == category.name);
      this.categories[index] = {name: category.name, checked: false};
    }
  }

  isDone() {
    let categories = [];
    this.categories.filter((elem) => {
      if (elem.checked === true) {
        categories.push(elem.name)
      }
    });

    this.http.post('http://sprypixels.com/demo/askinsurpedia/public/api/user/category/update', {
      user_id: this.user,
      category: categories.toString()
    }).subscribe((data) => {
      this.toast.showLongBottom('Categories updated successfully.').subscribe(() => {});
      this.storage.set('user', data['data']);
    });
  }

}
