import { Component, OnInit } from '@angular/core';
import { TrainingSesionsService } from "../training-sessions/training-sessions.service";
import { TrainingSession } from '../training-sessions/training-session';

@Component({
  selector: 'app-view-trainings',
  templateUrl: './view-trainings.page.html',
  styleUrls: ['./view-trainings.page.scss'],
})
export class ViewTrainingsPage implements OnInit {
  Trainings = [];

  constructor(
    private sesService: TrainingSesionsService
  ) { }

  ngOnInit() {
    this.fetchSessions();
    let trainingRes = this.sesService.getTrainingSessionList();
    trainingRes.snapshotChanges().subscribe(res => {
      
      this.Trainings = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.Trainings.push(a as TrainingSession);
      })
      console.log(this.Trainings);
    })

    

  }
  fetchSessions() {
    this.sesService.getTrainingSessionList().valueChanges().subscribe(res=> {
      // this.Trainings  = res ;
      console.log(this.Trainings);
    });
 
  }
  deleteTraining(id) {
    console.log(id)
    if (window.confirm('Do you really want to delete?')) {
      this.sesService.deleteTrainingSession(id)
    }
  }

}
