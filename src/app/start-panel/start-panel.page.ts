import { Component, OnInit } from '@angular/core';
import { RoutesRecognized, RouterModule } from '@angular/router';
import { LoadingController } from '@ionic/angular';




@Component({
  selector: 'app-start-panel',
  templateUrl: './start-panel.page.html',
  styleUrls: ['./start-panel.page.scss'],
})
export class StartPanelPage implements OnInit {

  constructor(public loadingController: LoadingController) { }

  ngOnInit() {
   
  }
 
   async Loading() {
    const loading = await this.loadingController.create({
      animated: true,
      spinner: "dots",
      duration: 2000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }
}
