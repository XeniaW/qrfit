import {Component,OnInit} from '@angular/core';
import {TrainingSession} from '../sessions/training-session';
import {TrainingSesionsService} from '../sessions/training-sessions.service';



@Component({
  selector: 'app-training',
  templateUrl: './training.page.html',
  styleUrls: ['./training.page.scss'],
})
export class TrainingPage implements OnInit {
  Trainings = [];

  constructor(
    private sesService: TrainingSesionsService
  ) {
 
  }

  ngOnInit() {
    let trainingRes = this.sesService.getSessionList();  
  }
}