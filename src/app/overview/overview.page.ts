import { Component, OnInit } from '@angular/core';
import {MachinesDbService} from '../machines/machines-db.service';
@Component({
  selector: 'app-overview',
  templateUrl: './overview.page.html',
  styleUrls: ['./overview.page.scss'],
})
export class OverviewPage implements OnInit {
  Machines = [];
  constructor(
    private machineServie: MachinesDbService
  ) {}

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
