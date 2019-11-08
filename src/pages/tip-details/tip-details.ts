import { SocialSharing } from "@ionic-native/social-sharing";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Toast } from "@ionic-native/toast";

@IonicPage()
@Component({
  selector: "page-tip-details",
  templateUrl: "tip-details.html"
})
export class TipDetailsPage {
  article: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public socialShare: SocialSharing,
    public toast: Toast
  ) {
    this.article = this.navParams.get("article");
  }

  share() {
    this.socialShare
      .share(
        this.article.content,
        this.article.title,
        null,
        "http://askinsurpedia.ng/"
      )
      .then(data => {
        console.log("share", data);
        this.toast
          .showLongBottom("Message Shared Successfully")
          .subscribe(() => {});
      })
      .catch(err => {
        console.log("share err", err);
      });
  }
}
