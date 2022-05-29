import { Component, AfterViewInit } from '@angular/core';

import { Platform, NavController, ModalController, MenuController, ActionSheetController, PopoverController, AlertController, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements AfterViewInit {

  backButtonSubscription: Subscription;
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;

  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private modalController: ModalController,
    private menu: MenuController,
    private actionSheetCtrl: ActionSheetController,
    private popoverCtrl: PopoverController,
    private router: Router,
    private location: Location,
    public modalCtrl: ModalController,
    private toastController: ToastController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  ngAfterViewInit(): void {
    this.backButtonEvent();
  }

  backButtonEvent() {
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(
      1,
      async () => {
        // close action sheet
        try {
          const element = await this.actionSheetCtrl.getTop();
          if (element) {
            element.dismiss();
          }
        } catch (error) {
          alert(error.error);
        }

        // close popover
        try {
          const element = await this.popoverCtrl.getTop();
          if (element) {
            element.dismiss();
          }
        } catch (error) {
          alert(error.error);
        }

        // close modal
        try {
          const element = await this.modalController.getTop();
          if (element) {
            element.dismiss();
          }
        } catch (error) {
          alert(error.error);
        }

        // close side menu
        try {
          const element = await this.menu.getOpen();
          if (element) {
            this.menu.close();
          }
        } catch (error) {
          alert(error.error);
        }

        if (this.router.url === '/tabs/tab1') {
          if (
            new Date().getTime() - this.lastTimeBackPress <
            this.timePeriodToExit
          ) {
            navigator[`app`].exitApp();
          } else {
            await this.presentToast(
              'Press back again to exit App.'
            );
            this.lastTimeBackPress = new Date().getTime();
          }
        } else {
          this.location.back();
        }
      }
    );
  }

  async presentToast(messageToPresent: string) {
    const toast = await this.toastController.create({
      duration: 2000,
      header: messageToPresent,
      position: 'bottom'
    });
    toast.present();
  }
}