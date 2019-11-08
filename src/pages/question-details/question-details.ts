import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Events } from "ionic-angular";
import { Storage } from "@ionic/storage";

@IonicPage()
@Component({
  selector: "page-question-details",
  templateUrl: "question-details.html"
})
export class QuestionDetailsPage {
  user: any;
  question: any;
  categories = [];
  myQuestion: Boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public events: Events,
    public http: HttpClient
  ) {
    this.question = this.navParams.get("question");
    console.log(this.question);
    this.categories = this.question.category.split(",");
    this.storage.get("user").then(user => {
      this.user = user;
    });

    events.subscribe("comment:created", comment => {
      console.log("event called...");
      this.question.comments.push(comment);
      this.http
        .post("http://backend.askinsurpedia.ng/public/api/questions/comment", {
          user: this.user.id,
          question: this.question.id,
          comment: comment.comment
        })
        .subscribe(data => {
          this.storage.set("questions", data);
        });
    });
  }

  openComment(id) {
    const data = {
      question: this.question.id,
      user: this.user.id,
      content: this.question.question,
      photo: this.user.photo,
      fname: this.user.fname,
      lname: this.user.lname
    };
    this.navCtrl.push("CommentPage", { data });
  }
}
