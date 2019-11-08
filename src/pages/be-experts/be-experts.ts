import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { IonicPage, NavController, LoadingController } from "ionic-angular";
import { Toast } from "@ionic-native/toast";

@IonicPage()
@Component({
  selector: "page-be-experts",
  templateUrl: "be-experts.html"
})
export class BeExpertsPage {
  name: string;
  specialty: string;
  experience: string;
  consultant: string;
  bio: string;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public http: HttpClient,
    public toast: Toast
  ) {}

  ngSubmit() {
    let load = this.loadingCtrl.create({
      spinner: "dots",
      content: "Please wait..."
    });
    load.present();

    this.http
      .post("http://backend.askinsurpedia.ng/public/api/bexpert", {
        name: this.name,
        specialty: this.specialty.toString(),
        experience: this.experience,
        consultant: this.consultant,
        bio: this.bio
      })
      .subscribe(
        data => {
          load.dismiss();
          this.toast
            .showLongCenter("Message sent, we will get back you ASAP.")
            .subscribe(() => {
              this.navCtrl.pop();
            });
        },
        err => {
          load.dismiss();
          console.log("err", err);
        }
      );
  }
}
