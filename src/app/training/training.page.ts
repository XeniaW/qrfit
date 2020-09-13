import {Component,OnInit, ElementRef} from '@angular/core';
import {TrainingSession} from '../training-sessions/training-session';
import {TrainingSesionsService} from '../training-sessions/training-sessions.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-training',
  templateUrl: './training.page.html',
  styleUrls: ['./training.page.scss'],
})
export class TrainingPage implements OnInit {
  Trainings = [];

  constructor(
    private sesService: TrainingSesionsService,
    private elementRef: ElementRef,
    private  alertController: AlertController,
    private router: Router,
  ) {
 
  }

  ngOnInit() {
    let trainingRes = this.sesService.getTrainingSessionList();  
  }

  async startTrainingAlert() {
    const alert = await this.alertController.create({
      header: 'You are about to sweat...',
      message: '<p>Do you really wish to start training now ?</p>',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.startTraining();
            console.log('OK');
          }
        }, {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
           
          }
        },
      ]
    });

    alert.present();
  }
  
  startTraining() {
    this.router.navigate(['/start-training']);
  }
}

