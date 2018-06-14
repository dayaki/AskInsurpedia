import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(public navCtrl: NavController) {}

  // Facebook Signup
  fbRegister() {}

  //Google+ Signup
  gRegister() {}

  // Email Signup
  eRegister() {
    this.navCtrl.push('EmailRegisterPage');
  }

  login() {
    this.navCtrl.push('LoginPage');
  }

}
