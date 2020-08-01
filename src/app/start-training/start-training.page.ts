import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { TrainingSesionsService } from "../training-sessions/training-sessions.service";
import { ToastController, LoadingController, Platform } from '@ionic/angular';
import jsQR from 'jsqr';



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
    scanActive = false;
    scanResult = null;
    @ViewChild('video', {static: false}) video: ElementRef;
    @ViewChild ('canvas', {static: false}) canvas: ElementRef;
   
    canvasElement: any;
    videoElement: any;
    canvasContext: any;
    loading: HTMLIonLoadingElement;

  
  constructor( private sesService: TrainingSesionsService, private toastCtrl: ToastController, private loadingCtrl: LoadingController) {}

    ngAfterViewInit() {
      this.videoElement = this.video.nativeElement;
      this.canvasElement = this.canvas.nativeElement;
      this.canvasContext = this.canvasElement.getContext('2d');
    }
    // scanResult DB matching ?

     // Helper functions
    async showQrToast() {
      const toast = await this.toastCtrl.create({
        message: `Open ${this.scanResult}?`,
        position: 'top',
        buttons: [
        {
          text: 'Open',
          handler: () => {
            window.open(this.scanResult, '_system', 'location=yes');
          }
        }
      ]
    });
    toast.present();
     }
 
    async startScan() {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {facingMode: 'environment'}
      });
      this.videoElement.setAttribute('playsinline', true);
      
       this.videoElement.srcObject = stream;
       this.loading = await this.loadingCtrl.create({});
       await this.loading.present();
 
      this.videoElement.play();
      requestAnimationFrame(this.scan.bind(this));
    }
    async scan() {
      console.log('SCAN');
      if (this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA) {
          if (this.loading) {
            await this.loading.dismiss();
            this.loading = null;
            this.scanActive = true;
          }
          this.canvasElement.height = this.videoElement.videoHeight;
          this.canvasElement.width = this.videoElement.videoWidth;

          this.canvasContext.drawImage (
            this.videoElement,
            0,
            0,
            this.canvasElement.width,
            this.canvasElement.height
          );

          const imageData = this.canvasContext.getImageData (
            0,
            0,
            this.canvasElement.width,
            this.canvasElement.height
          );
          const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: 'dontInvert'
          }) 
          console.log('code: ', code);

          if (code) {
            this.scanActive = false;
            this.scanResult = code.data;
            this.showQrToast();
          }
          else {
            if (this.scanActive) {
              requestAnimationFrame(this.scan.bind(this));
            }
          }

      } else {
        if (this.scanActive) {
          requestAnimationFrame(this.scan.bind(this));
        }
        
      }
    }

    stopScan() {
      this.scanActive = false;
    }
    reset() {
      this.scanResult = null;
    }
  
   startTimer(duration: number) {
     clearInterval(this.interval)
     this.timer = duration * 60;
     this.interval =  setInterval( () => {
        this.updateTimeValue();
      }, 1000);
    }
    pauseTimer () {
      
    }

    updateTimeValue() {
      let minutes:any = this.timer / 60;
      let seconds:any = this.timer % 60;
      minutes = String ('0' + Math.floor(minutes)).slice(-2);
      seconds = String ('0' + Math.floor(seconds)).slice(-2);

      const text = minutes + ':' + seconds;
      this.time.next(text);
      ++this.timer; // change to -- to get from countdown to stopwatch
      // if (this.timer <0 ) {
      //   this.startTimer(5);
      // }

    }

   

   
  ngOnInit() {

    this.startTimer(0);

    let TimeStart = new Date().getTime();
    this.startTrainingDate =  ({
      createdAt: [TimeStart]
    });
   
    console.log(this.startTrainingDate.createdAt);
    console.log(this.sesService.trainingListRef);
    this.sesService.createTrainingSession(this.startTrainingDate).then(res => {
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
