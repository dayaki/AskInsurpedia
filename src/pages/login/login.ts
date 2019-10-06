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
              .post("http://sprypixels.com/demo/askinsurpedia/public/api/fb", {
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

  // Linkedin Login
  linkedinLogin() {
    // let load = this.loadingCtrl.create({
    //   spinner: 'dots',
    //   content: 'Authenticating...'
    // });
    // this.linkedin.login(['r_basicprofile', 'r_emailaddress'], true).then(() => {
    //   load.present();
    //   this.linkedin.getRequest('people/~').then((res) =>  {
    //     this.linkedin.getRequest('people/~:(email_address,picture-url)').then((data) =>  {
    //       this.http.post('http://sprypixels.com/demo/askinsurpedia/public/api/linkedin', {
    //         fname: res.firstName,
    //         lname: res.lastName,
    //         email: data.emailAddress,
    //         lid: res.id,
    //         photo: data.pictureUrl
    //       }).subscribe((status) => {
    //         this.storage.set('user', data['data']);
    //         load.dismiss();
    //         if (status['firstTime'] == true ) {
    //           this.sendMail(data['data'].email);
    //           this.navCtrl.setRoot('FirstTimeOptionsPage');
    //         } else {
    //           this.navCtrl.setRoot('TabsPage');
    //         }
    //       }, err => {
    //         load.dismiss();
    //         console.log('err', err);
    //         this.toast.showLongBottom('Network error, please again later').subscribe(() => {});
    //       });
    //     });
    //   }).catch(e => console.log(e));
    // }).catch(e => console.log('Error logging in', e));
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
        load.present();
        this.http
          .post("http://sprypixels.com/demo/askinsurpedia/public/api/google", {
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
      .post("http://sprypixels.com/demo/askinsurpedia/public/api/mail/later", {
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
