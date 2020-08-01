import { Injectable } from '@angular/core';
import {TrainingSession} from '../training-sessions/training-session';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class TrainingSesionsService {

  trainingListRef: AngularFireList<any>;
  trainingRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { }


  //create session
  createTrainingSession(ses: TrainingSession) {
     return this.trainingListRef.push({
        createdAt: ses.createdAt,
      });

  }
  //Get Single
  getTrainingSession(id: string) {
    this.trainingRef = this.db.object('/training-sessions/' + id);
    return this.trainingRef;
  }
  //Get List
  getTrainingSessionList() {
    this.trainingListRef = this.db.list('/training-sessions');
    return this.trainingListRef;
  }
  //Update
    updateTrainingSession(id, ses:TrainingSession) {
      return this.trainingRef.update({
        endedAt: ses.endedAt
      })
  }
  //Delete
    deleteTrainingSession (id: string) {
      this.trainingRef = this.db.object('/training-sessions/' + id);
      this.trainingRef.remove();
    }
}
