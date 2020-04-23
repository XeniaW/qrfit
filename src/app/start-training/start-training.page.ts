import { Component, OnInit } from '@angular/core';
import {TrainingPage} from '../training/training.page';
import { BehaviorSubject } from "rxjs";
import { CommonModule } from '@angular/common';
import {TrainingSession} from '../sessions/training-session';
import { TrainingSesionsService } from "../sessions/training-sessions.service";



let lapsNr = 1
function format(ms) {
  const minutes = Math.floor(ms / (1000 * 60));
  const seconds = Math.floor((ms - minutes * 1000 * 60) / 1000);
  const fract = Math.floor((ms - minutes * 1000 * 60 - seconds * 1000) / 10);
  return minutes + 'm ' + (seconds < 10 ? '0' : '') + seconds + 's.' + (fract < 10 ? '0' : '') + fract;
}

@Component({
  selector: 'app-start-training',
  templateUrl: './start-training.page.html',
  styleUrls: ['./start-training.page.scss'],
})
export class StartTrainingPage implements OnInit {
    time: BehaviorSubject<string> = new BehaviorSubject('00:00');
    timer: number;
    interval;
    startTrainingDate;

  
  constructor( private sesService: TrainingSesionsService) {}
  
   startTimer(duration: number) {
     clearInterval(this.interval)
     this.timer = duration * 60;
     this.interval =  setInterval( () => {
        this.updateTimeValue();
      }, 1000);
    }

    updateTimeValue() {
      let minutes:any = this.timer / 60;
      let seconds:any = this.timer % 60;
      minutes = String ('0' + Math.floor(minutes)).slice(-2);
      seconds = String ('0' + Math.floor(seconds)).slice(-2);

      const text = minutes + ':' + seconds;
      this.time.next(text);
      ++this.timer;
      if (this.timer <0 ) {
        this.startTimer(5);
      }

    }

   

   
  ngOnInit() {

    this.startTimer(0);
    
    let TimeStart = new Date().getTime();
    this.startTrainingDate =  ({
      createdAt: [TimeStart]
    });
   
    console.log(this.startTrainingDate.createdAt);
    console.log(this.sesService.trainingListRef);
    this.sesService.createSession(this.startTrainingDate).then(res => {
      console.log(res);      
    })
    .catch(error => console.log(error)); 
    
  }
 
  finishTraining() {
    let finishTrainingDate = Date.now();
    let total = finishTrainingDate - this.startTrainingDate.createdAt;
    console.log(total);
    
    
  
 
   }

}
