import { Component, OnInit, AfterViewInit, ElementRef} from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import * as $ from 'jquery'




declare var System: any;

declare var resetView: any;
declare var runtime: any;
declare var hitPnt: any;




@Component({
  selector: 'app-advisor',
  templateUrl: './advisor.page.html',
  styleUrls: ['./advisor.page.scss'],
})

export class AdvisorPage implements OnInit, AfterViewInit {
  _window: any = window;
  

  constructor(
    private elementRef: ElementRef,
    private  alertController: AlertController,
    public loadingController: LoadingController,
    private router: Router
    
  ) {
     this.Loading();
    this.importX3d();
  }
  



  ngAfterViewInit() {
    //var clickEvent: any = ('ontouchstart' in window ? 'touchend' :'click');
    //this.elementRef.nativeElement.querySelector('#superShape').addEventListener('click', this.onClick.bind(this)); 
    //this.elementRef.nativeElement.querySelector('#superShape').addEventListener('tap', this.onClick.bind(this)); //touchstart ?
    // Allows manipulation of DOM Elements

    this.elementRef.nativeElement.querySelector('#chest').addEventListener('click', this.onChestClick.bind(this));
    this.elementRef.nativeElement.querySelector('#chest').addEventListener('touchstart', this.onTest.bind(this));
    
    this.elementRef.nativeElement.querySelector('#torso').addEventListener('click', this.onTorsoClick.bind(this));
    this.elementRef.nativeElement.querySelector('#biceps').addEventListener('click', this.onBicepsClick.bind(this));
       
    
    
  }
  
  ngOnInit() {
   
    
    if(this._window.x3dom !== undefined){
      this._window.x3dom.reload();
    }
  }

  importX3d(): void {
      System.import('x3dom').then(() => { 
        console.log('loaded x3d');
               
        this.presentAlert();
    }).catch((e: any) => {
        console.warn(e);
    })
  }
  
  onTest(dunno) {
    console.log('chest', dunno)
    if (dunno.cancelable) {
      dunno.preventDefault();
   }
  }

  onBicepsClick(dunno) {


    $('#marker').attr('translation', dunno.hitPnt);
    var coordinates = dunno.hitPnt;
  console.log("Coordinates: ", coordinates);
  console.log(dunno);
  this.elementRef.nativeElement.querySelector('#biceps_color').setAttribute('diffuseColor', '0.7451 0 0'); 
        this.BicepsMuscleAlert();  
  }
  onTorsoClick(dunno) {
    $('#marker').attr('translation', dunno.hitPnt);
    var coordinates = dunno.hitPnt;
  console.log("Coordinates: ", coordinates);
  console.log(dunno);
  this.elementRef.nativeElement.querySelector('#torso_color').setAttribute('diffuseColor', '0.7451 0 0'); 
        this.TorsoMuscleAlert();  
  }


  onChestClick(dunno) {
    
  
    	$('#marker').attr('translation', dunno.hitPnt);
      var coordinates = dunno.hitPnt;
    console.log("Coordinates: ", coordinates);
    console.log(dunno);

    // if (coordinates[0] >= -18 && coordinates[0] <=7 && coordinates[1]>=133 && coordinates[1]<=145 && coordinates[2]>=9 && coordinates[2]<=24) {
    //   console.log("this  chest");
    //   this.muscleAlert();
    // } else {
    //   console.log("this is fine");
    // }

    	//Mark hitting point	
    	//Display coordinates of hitting point (rounded)
    		 
    		// $('#coordX').html(roundWithTwoDecimals(coordinates[0]));
    		// $('#coordY').html(roundWithTwoDecimals(coordinates[1]));
        // $('#coordZ').html(roundWithTwoDecimals(coordinates[2]));
        this.elementRef.nativeElement.querySelector('#chest_color').setAttribute('diffuseColor', '0.7451 0 0'); 
        this.ChestMuscleAlert();  


  }
    async Loading() {
    const loading = await this.loadingController.create({
      animated: true,
      spinner: "dots",
      duration: 2000,
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }
  
 async presentAlert() {
    const alert = await this.alertController.create({
      message: '<p>Use <strong>one</strong> finger to move the model around the axis </p><br/> <p>Use <strong>two</strong> fingers to zoom in/out or to pan</p> <br/><p>Push "Reset" button to bring the the model to its origin position</p>',
      buttons: ['OK']
    });

    alert.present();
    
  }

  async ChestMuscleAlert() {
    const alert = await this.alertController.create({
      header: 'Pectoralis Major',
      subHeader: ' You may try these machines:',
      buttons: [
        {
          text: 'View Options',
          handler: () => {
            this.goToMachines();
            console.log('OK');
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
            this.elementRef.nativeElement.querySelector('#chest_color').setAttribute('diffuseColor', '0.588 0.588 0.588'); 
          }
        }, ]
    });

    alert.present();
    
  }
  async BicepsMuscleAlert() {
    const alert = await this.alertController.create({
      header: 'Biceps',
      subHeader: ' You may try these machines:',
      buttons: [
        {
          text: 'View Options',
          handler: () => {
            this.goToMachines();
            console.log('OK');
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
            this.elementRef.nativeElement.querySelector('#biceps_color').setAttribute('diffuseColor', '0.588 0.588 0.588'); 
          }
        }, ]
    });

    alert.present();
    
  }
  async TorsoMuscleAlert() {
    const alert = await this.alertController.create({
      header: 'Internal Oblique',
      subHeader: ' You may try these machines:',
      buttons: [
        {
          text: 'View Options',
          handler: () => {
            this.goToMachines();
            console.log('OK');
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.elementRef.nativeElement.querySelector('#torso_color').setAttribute('diffuseColor', '0.588 0.588 0.588'); 
          }
        }, ]
    });

    alert.present();
    
  }
  
  Reset() {
    // let DOMElement = (<HTMLInputElement>document.getElementById('someUniqueId')).runtime.resetView(); // does not compile for android
     let DOMElement: any = document.getElementById('someUniqueId'); // if unsure which type is var => any
     DOMElement.runtime.resetView(); 
  }
  goToMachines() {
    this.router.navigate(['/machines']);;
  }
}


