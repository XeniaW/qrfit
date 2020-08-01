import { Component, OnInit } from '@angular/core';
import {MachinesDbService} from './machines-db.service';
@Component({
  selector: 'app-machines',
  templateUrl: './machines.page.html',
  styleUrls: ['./machines.page.scss'],
})
export class MachinesPage implements OnInit {
Machines = [];
  constructor(
    private machineServie: MachinesDbService
  ) { }

  ngOnInit() {
    this.fetchMachines();
    let machineRes = this.machineServie.getMachineList();
    machineRes.snapshotChanges().subscribe(res => { 
      //console.log(res);
      res.forEach(item => {
        let a = item.payload.toJSON(); // get payload from changes to JSON 
        this.Machines.push(a);    
        console.log(this.Machines);
      })
       
    });
    
  }

  fetchMachines() {
    this.machineServie.getMachineList().valueChanges().subscribe(res => {

    })
  }

}
