import { HttpClient } from "@angular/common/http";
import { Storage } from "@ionic/storage";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  ModalController,
  Events,
  AlertController,
  App
} from "ionic-angular";
import { AppRate } from "@ionic-native/app-rate";
import { Camera, CameraOptions } from "@ionic-native/camera";

@IonicPage()
@Component({
  selector: "page-profile",
  templateUrl: "profile.html"
})
export class ProfilePage {
  user: any;

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    targetWidth: 500,
    targetHeight: 500,
    allowEdit: true
  };

  constructor(
    public navCtrl: NavController,
    private appRate: AppRate,
    private camera: Camera,
    public storage: Storage,
    public modalCtrl: ModalController,
    public http: HttpClient,
    public alertCtrl: AlertController,
    public app: App
  ) {
    this.storage.get("user").then(user => {
      this.user = user;
    });
  }

  changePhoto() {
    this.camera.getPicture(this.options).then(
      imageData => {
        let base64Image = "data:image/jpeg;base64," + imageData;
        this.user.photo = base64Image;
        this.uploadImage(base64Image);
      },
      err => {
        console.log("err", err);
      }
    );
  }

  uploadImage(image) {
    this.http
      .post("http://backend.askinsurpedia.ng/public/api/user/photo", {
        user_id: this.user.id,
        photo: image
      })
      .subscribe(
        status => {
          this.storage.set("user", status["data"]);
        },
        err => {
          console.log("Error updating", err);
        }
      );
  }

  beExpert() {
    this.navCtrl.push("BeExpertsPage");
  }

  coverRisk() {
    this.navCtrl.push("CoverRiskPage");
  }

  logOut() {
    let alert = this.alertCtrl.create({
      title: "Confirm Logout",
      message: "Do you want to logout from the app?",
      buttons: [
        { text: "Cancel", role: "cancel" },
        {
          text: "Yes, please",
          handler: () => {
            this.storage.clear().then(() => {
              this.app.getRootNavs()[0].setRoot("LoginPage");
            });
          }
        }
      ]
    });
    alert.present();
  }

  about() {
    this.navCtrl.push("AboutPage");
  }

  changePassword() {}

  topics() {
    this.navCtrl.push("TopicsPage");
  }

  myQuestions() {
    this.navCtrl.push("MyActivityPage");
  }
}
