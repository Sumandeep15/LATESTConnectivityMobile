import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';

import { User } from '../../providers/providers';
import { MainPage, LandingPage, HomePage, MenuPage } from '../pages';
import { Device } from '@ionic-native/device';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  menu1hide: true;
  menu2hide: false;
  modulename: "Login"
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { userName: string, password: string, uuid: string } = {
    userName: '',
    password: '',
    uuid: ''
  };

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public menu: MenuController,
    private device: Device) {

    this.menu.enable(false, 'menu1');
    this.menu.enable(false, 'menu2');

  }

  // Attempt to login in through our User service
  doLogin() {

    this.account.uuid = this.device.uuid;
    this.user.login(this.account).subscribe((resp: any) => {
     // alert(JSON.stringify(resp))
      if (resp.status == 1) {
       // alert("here")
        this.navCtrl.setRoot(HomePage);
      }
      else {
     //   alert("Wrong credentials");
      }
    }, (err) => {
     // alert(JSON.stringify(err))
      // this.navCtrl.push(HomePage);
      // Unable to log in

    });
  }
}
