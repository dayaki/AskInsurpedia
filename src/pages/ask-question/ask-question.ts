import { Toast } from "@ionic-native/toast";
import { Storage } from "@ionic/storage";
import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { IonicPage, NavController, LoadingController } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-ask-question",
  templateUrl: "ask-question.html"
})
export class AskQuestionPage {
  question: String;
  category: String;
  anonymous: String;
  user: any;

  constructor(
    public navCtrl: NavController,
    public http: HttpClient,
    public storage: Storage,
    public toast: Toast,
    public loadingCtrl: LoadingController
  ) {
    this.storage.get("user").then(user => {
      this.user = user.id;
    });
  }

  sendQuestion() {
    let load = this.loadingCtrl.create({
      spinner: "dots",
      content: "Posting question..."
    });
    load.present();
    this.http
      .post("http://backend.askinsurpedia.ng/public/api/questions/post", {
        user: this.user,
        question: this.question,
        category: this.category,
        anonymous: this.anonymous
      })
      .subscribe(
        status => {
          console.log(status);
          this.storage.set("questions", status["data"]);
          load.dismiss();
          this.toast
            .showLongBottom("Your question has been posted.")
            .subscribe(() => {
              this.navCtrl.pop();
            });
          this.navCtrl.pop();
        },
        err => {
          console.log("err", err);
          load.dismiss();
          this.toast
            .showLongBottom("Network error, try again.")
            .subscribe(() => {});
        }
      );
  }

  close() {
    this.navCtrl.setRoot("TabsPage");
  }
}
