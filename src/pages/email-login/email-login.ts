import { Toast } from "@ionic-native/toast";
import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { IonicPage, NavController, LoadingController } from "ionic-angular";
import { Storage } from "@ionic/storage";

@IonicPage()
@Component({
  selector: "page-email-login",
  templateUrl: "email-login.html"
})
export class EmailLoginPage {
  email: String;
  password: String;

  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    public http: HttpClient,
    public toast: Toast
  ) {}

  login() {
    let load = this.loadingCtrl.create({
      spinner: "dots",
      content: "Authenticating..."
    });
    load.present();
    this.http
      .post("http://backend.askinsurpedia.ng/public/api/login", {
        email: this.email,
        password: this.password
      })
      .subscribe(
        data => {
          console.log("login", data);
          if (data["status"] === "error") {
            load.dismiss();
            this.toast
              .showLongCenter("Invalid email or password")
              .subscribe(() => {});
          } else {
            this.storage.set("user", data["data"]);
            load.dismiss();
            this.navCtrl.setRoot("TabsPage");
          }
        },
        err => {
          load.dismiss();
          alert("Network Error, please try again.");
          console.log(JSON.stringify(err));
        }
      );
  }
}
