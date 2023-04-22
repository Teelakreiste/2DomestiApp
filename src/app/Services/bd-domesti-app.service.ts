import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, doc, deleteDoc, collectionData, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BdDomestiAppService {

  constructor(private firestore: Firestore) { }

  saveEmployee(employee: any) {
    const employeeRef = collection(this.firestore, 'employees');
    return addDoc(employeeRef, employee);
  }

  getEmployees() {
    const employeeRef = collection(this.firestore, 'employees');
    return collectionData(employeeRef, { idField: 'id' });
  }

  deleteEmployee(employee: any) {
    const employeeRef = doc(this.firestore, 'employees', employee.id);
    return deleteDoc(employeeRef);
  }

  updateEmployee(employee: any) {
    const employeeRef = doc(this.firestore, 'employees', employee.id);
    return updateDoc(employeeRef, employee);
  }
}
