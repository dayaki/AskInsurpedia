import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: String;

  constructor(private platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen, public storage: Storage, public http: HttpClient) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.checkStatus();
      this.fetchData();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  checkStatus() {
    this.storage.ready().then(() => {
      this.storage.get('user').then((status) => {
        if (status === null) {
          this.rootPage = 'LoginPage';
        } else {
          this.rootPage = 'TabsPage';
        }
      });
    });
  }

  fetchData() {
    this.http.get('http://sprypixels.com/demo/askinsurpedia/public/api/questions/all').subscribe((data) => {
      this.storage.set('questions', data);
    });
  }
}
