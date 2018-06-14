import { Toast } from '@ionic-native/toast';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-cover-risk',
  templateUrl: 'cover-risk.html',
})
export class CoverRiskPage {
  name: String;
  risks: String;
  phone: String;
  email: String;
  contact: String;

  constructor(public navCtrl: NavController, public http: HttpClient, public loadingCtrl: LoadingController, public toast: Toast) {}

  ngSubmit() {
    let load = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Please wait...'
    });
    load.present();

    this.http.post('http://sprypixels.com/demo/askinsurpedia/public/api/risks', {
      name: this.name,
      risks: this.risks.toString(),
      phone: this.phone,
      email: this.email,
      contact: this.contact
    }).subscribe((data) => {
      load.dismiss();
      this.toast.showLongCenter('Message sent, we will get back to you ASAP.').subscribe(() => {});
    }, (err) => {
      load.dismiss();      
      console.log('err', err);
    });
  }


}
