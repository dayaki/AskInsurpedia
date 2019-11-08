import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IonicPage, NavController } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-tips",
  templateUrl: "tips.html"
})
export class TipsPage {
  hasArticles: Boolean = false;
  articles: any;

  constructor(public navCtrl: NavController, public http: HttpClient) {}

  ionViewWillEnter() {
    this.http
      .get("http://backend.askinsurpedia.ng/public/api/articles")
      .subscribe(data => {
        this.articles = data;
        this.hasArticles = true;
      });
  }

  details(article) {
    this.navCtrl.push("TipDetailsPage", { article });
  }
}
