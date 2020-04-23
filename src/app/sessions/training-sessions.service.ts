import { Injectable } from '@angular/core';
import {TrainingSession} from '../sessions/training-session';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class TrainingSesionsService {

  trainingListRef: AngularFireList<any>;
  trainingRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { }


  //create session
  createSession(ses: TrainingSession) {
     return this.trainingListRef.push({
        createdAt: ses.createdAt,
      });

  }
  //Get Single
  getSession(id: string) {
    this.trainingRef = this.db.object('/training-sessions/' + id);
    return this.trainingRef;
  }
  //Get List
  getSessionList() {
    this.trainingListRef = this.db.list('/training-sessions');
    return this.trainingListRef;
  }
  //Update
    updateSession(id, ses:TrainingSession) {
      return this.trainingRef.update({
        endedAt: ses.endedAt
      })
  }
  //Delete
    deleteTraining (id: string) {
      this.trainingRef = this.db.object('/training-sessions/' + id);
      this.trainingRef.remove();
    }
}
