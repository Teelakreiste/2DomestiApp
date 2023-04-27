import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, doc, deleteDoc, collectionData, updateDoc, where, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Empleado } from '../Models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class BdDomestiAppService {

  constructor(private firestore: Firestore) { }

  saveEmployee(employee: any) {
    const employeeRef = collection(this.firestore, 'employees');
    return addDoc(employeeRef, employee);
  }

  getEmployees(): Observable<Empleado[]> {
    const employeeRef = collection(this.firestore, 'employees');
    return collectionData(employeeRef, { idField: 'id' }) as Observable<Empleado[]>;
  }

  deleteEmployee(employee: any) {
    const employeeRef = doc(this.firestore, 'employees', employee.id);
    return deleteDoc(employeeRef);
  }

  updateEmployee(employee: any) {
    const employeeRef = doc(this.firestore, 'employees', employee.id);
    return updateDoc(employeeRef, employee);
  }

  searchUser(email: string): Observable<Empleado[]> {
    const QWhere = where('email', '==', email);
    const employeeRef = query(collection(this.firestore, 'employees'), QWhere);
    return collectionData(employeeRef, { idField: 'id' }) as Observable<Empleado[]>;
  }
}
