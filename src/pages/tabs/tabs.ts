import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root = 'HomePage';
  tab2Root = 'QuestionsPage';
  tab3Root = 'TipsPage';
  tab4Root = 'ProfilePage';

  constructor(public navCtrl: NavController) {}

}
