import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class MachinesDbService {

  machinesListRef: AngularFireList<any>;
  machinesRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {}
  // get Single
  getMachine(id: string) {
    this.machinesRef = this.db.object('/machines/' + id);
    return this.machinesRef;
  }
   // get List
  getMachineList() {
    this.machinesListRef = this.db.list('/machines');
    return this.machinesListRef;
  }
  

 }

  
