import { Storage } from "@ionic/storage";
import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-questions",
  templateUrl: "questions.html"
})
export class QuestionsPage {
  hasQuestion: Boolean = false;
  questions: any;
  categories = [];

  constructor(public navCtrl: NavController, public storage: Storage) {
    this.storage.get("user").then(userData => {
      this.storage.get("questions").then(questions => {
        if (questions !== null) {
          this.questions = questions.filter(el => {
            if (
              userData.category
                .toLowerCase()
                .includes(el.category.toLowerCase())
            ) {
              return el;
            }
          });
          if (this.questions.length > 0) {
            this.hasQuestion = true;
          }
        }
      });
    });
  }

  details(question) {
    this.navCtrl.push("QuestionDetailsPage", { question });
  }
}
