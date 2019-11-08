import { Toast } from "@ionic-native/toast";
import { Storage } from "@ionic/storage";
import { Component } from "@angular/core";
import { IonicPage, NavController, LoadingController } from "ionic-angular";
import { HttpClient } from "@angular/common/http";

@IonicPage()
@Component({
  selector: "page-email-register",
  templateUrl: "email-register.html"
})
export class EmailRegisterPage {
  fname: String;
  lname: String;
  email: String;
  password: String;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public http: HttpClient,
    public storage: Storage,
    public toast: Toast
  ) {}

  register() {
    let load = this.loadingCtrl.create({
      spinner: "dots",
      content: "Creating Account..."
    });
    load.present();
    this.http
      .post("http://backend.askinsurpedia.ng/public/api/signup", {
        fname: this.fname,
        lname: this.lname,
        email: this.email,
        password: this.password
      })
      .subscribe(
        data => {
          this.sendMail(data["data"].email);
          this.storage.set("user", data["data"]);
          load.dismiss();
          this.navCtrl.setRoot("FirstTimeOptionsPage");
        },
        err => {
          load.dismiss();
          console.log("error", err);
          this.toast
            .showLongBottom("Email address is already in use.")
            .subscribe(() => {});
        }
      );
  }

  sendMail(email) {
    this.http
      .post("http://backend.askinsurpedia.ng/public/api/mail/later", {
        email: email
      })
      .subscribe(data => {
        console.log("mail sent", data);
      });
  }
}
