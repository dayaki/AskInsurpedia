import { HttpClient } from "@angular/common/http";
import { Storage } from "@ionic/storage";
import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-first-time-options",
  templateUrl: "first-time-options.html"
})
export class FirstTimeOptionsPage {
  user: any;
  categories = [
    { name: "Insurance" },
    { name: "Annuity and Investments" },
    { name: "Contracts and Liabilities" },
    { name: "Wills and Trusts" },
    { name: "Pensions" }
  ];
  selectedCategory = Array();

  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    public http: HttpClient
  ) {
    this.storage.get("user").then(user => {
      this.user = user.id;
    });
  }

  onChange(category: string, isChecked: boolean) {
    if (isChecked) {
      this.selectedCategory.push(category);
    } else {
      let index = this.selectedCategory.findIndex(x => x == category);
      this.selectedCategory.splice(index, 1);
    }
  }

  isDone() {
    this.http
      .post("http://backend.askinsurpedia.ng/public/api/user/category/update", {
        user_id: this.user,
        category: this.selectedCategory.toString()
      })
      .subscribe(data => {
        console.log("category updated");
        this.storage.set("user", data["data"]);
      });

    this.navCtrl.setRoot("TabsPage");
  }
}
