import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class BdDomestiAppService {

  constructor(private angularFirestore: AngularFirestore) { }

  async saveEmployee(employee: any) {
    return await this.angularFirestore.collection('employees').add(employee);
  }
}
