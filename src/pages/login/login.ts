import { Toast } from "@ionic-native/toast";
import { Storage } from "@ionic/storage";
import { Component } from "@angular/core";
import { IonicPage, NavController, LoadingController } from "ionic-angular";
import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook";
import { GooglePlus } from "@ionic-native/google-plus";
import { LinkedIn } from "@ionic-native/linkedin";
import { HttpClient } from "@angular/common/http";

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  constructor(
    public navCtrl: NavController,
    private fb: Facebook,
    private googlePlus: GooglePlus,
    public loadingCtrl: LoadingController,
    public http: HttpClient,
    public storage: Storage,
    private linkedin: LinkedIn,
    public toast: Toast
  ) {}

  // Facebook Login
  fbLogin() {
    let load = this.loadingCtrl.create({
      spinner: "dots",
      content: "Authenticating..."
    });

    this.fb
      .login(["public_profile", "email"])
      .then((res: FacebookLoginResponse) => {
        load.present();
        this.fb
          .api(
            "/" + res.authResponse.userID + "?fields=id,name,email,picture",
            []
          )
          .then(data => {
            let newstring = data.name.split(/[ ,]+/);
            let [fname, lname] = newstring;
            this.http
              .post("http://backend.askinsurpedia.ng/public/api/fb", {
                fname: fname,
                lname: lname,
                email: data.email,
                fbid: data.id,
                photo: data.picture.data.url
              })
              .subscribe(
                status => {
                  status["data"].photo = data.picture.data.url;
                  this.storage.set("user", status["data"]);
                  load.dismiss();
                  if (status["firstTime"] == true) {
                    this.sendMail(status["data"].email);
                    this.navCtrl.setRoot("FirstTimeOptionsPage");
                  } else {
                    this.navCtrl.setRoot("TabsPage");
                  }
                },
                err => {
                  load.dismiss();
                  this.toast
                    .showLongBottom("Network error, please again later")
                    .subscribe(() => {});
                  console.log("err", err);
                }
              );
          });
      })
      .catch(e => {
        console.log("Error logging into Facebook", e);
        alert("Error logging into Facebook");
      });
  }

  // Google+ Login
  gLogin() {
    let load = this.loadingCtrl.create({
      spinner: "dots",
      content: "Authenticating..."
    });
    this.googlePlus
      .login({})
      .then(res => {
        console.log("google", res);
        load.present();
        this.http
          .post("http://backend.askinsurpedia.ng/public/api/google", {
            fname: res.givenName,
            lname: res.familyName,
            email: res.email,
            gid: res.userId,
            photo: res.imageUrl
          })
          .subscribe(
            data => {
              this.storage.set("user", data["data"]);
              load.dismiss();
              if (data["firstTime"] == true) {
                this.sendMail(data["data"].email);
                this.navCtrl.setRoot("FirstTimeOptionsPage");
              } else {
                this.navCtrl.setRoot("TabsPage");
              }
            },
            err => {
              load.dismiss();
              this.toast
                .showLongBottom("Network error, please again later")
                .subscribe(() => {});
              console.log("err", err);
            }
          );
      })
      .catch(err => console.error("err", err));
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

  // Email Login
  eLogin() {
    this.navCtrl.push("EmailLoginPage");
  }

  // Register page
  register() {
    this.navCtrl.push("EmailRegisterPage");
  }
}
