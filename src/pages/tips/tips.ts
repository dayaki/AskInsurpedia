import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tips',
  templateUrl: 'tips.html',
})
export class TipsPage {
  hasArticles: Boolean = true;
  articles = [
    {
      title: 'Why You Need Insurance',
      image: 'assets/img/post-2.jpg',
      content: '<p>Insurance is a method of managing unforeseen risks. With insurance, you transfer the financial cost of a potential loss to the insurance company in exchange for a small fee, known as the premium.</p><p>Insurance helps you in a variety of ways:</p><ul><li><strong>Own a home?</strong> – Be rest assured you will receive alternative accommodation in the event of a disaster whilst you await completion of repair works or disbursement of reinstatement funds by your insurers.</li><li><strong>Drive vehicles?</strong> Insurers have your back in the event of sudden accidental repairs, health care costs and legal expenses associated with collisions and injuries.</li><li>Maintain your current standard of living if you become disabled or have a critical illness</li><li>Cover health care costs like prescription drugs, dental care, vision care and other health-related items</li><li>Provide for your family in the event of a death</li><li>Take vacations without worrying about flight cancellations or other potential issues</li></ul><p>Take the time to review your policies and contact one of our helpful Financial Advisors to answer your questions or get advice. A little knowledge can make a big difference when it comes to buying the right insurance protection for you and your family.</li>'
    },
    {
      title: 'What is car insurance excess?',
      image: 'assets/img/post-1.jpg',
      content: '<p>The car insurance excess is the amount you will be required to pay when you make a claim on your policy. In other words, it’s the amount you agree to contribute towards the cost of a claim, with the insurer covering the remaining amount.</p><p>For example, if your policy has a $500 excess and you make a claim for $3,000 damage to your vehicle, you’ll cover the first $500 of the repair costs and the insurer will foot the bill for the remaining $2,500.</p><p>However, the amount of excess payable varies depending on a number of factors. Not only does the excess differ according to the policy you select, but you can also adjust your excess higher or lower to vary your premium amount</p><h3>Why do insurers include an excess on their policies?</h3><p>The purpose of car insurance excesses is to reduce the number of small claims insurers are required to pay out. If the excess didn’t exist, we’d all be able to lodge claims for every minor little bump, scratch and dent that our cars suffer.</p><p>While this may seem like a wonderful idea on the surface, it would cause the cost of car insurance policies to skyrocket, and the premiums could leave a much bigger dent in your bank balance.</p><p>But by getting policyholders to agree to pay the first part of each claim themselves, insurers are able to prevent myriad claims for minor repairs and therefore keep car insurance premiums down. This in turn means that you can fall back on car insurance in those situations where you really need the financial protection it provides.</p><p>Furthermore, an insurance excess keeps the morale hazard low by making the insureds partly responsible for each and every loss thus there is shared interest in being responsible in  protecting the subject matter of interest.</p>'
    }
  ];
  
  constructor(public navCtrl: NavController) {}

  details(article) {
    this.navCtrl.push('TipDetailsPage', { article });
  }

}
