import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, doc, deleteDoc, collectionData, updateDoc, where, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private firestore: Firestore) { }

  // Create a new document in the collection
  save(data: any, path: string) {
    const dataRef = collection(this.firestore, path);
    return addDoc(dataRef, data);
  }

  // Get all documents in a collection
  getAll(path: string): Observable<any[]> {
    const dataRef = collection(this.firestore, path);
    return collectionData(dataRef, { idField: 'id' }) as Observable<any[]>;
  }

  // Delete a document from the collection
  delete(id: string, path: string) {
    const dataRef = doc(this.firestore, path, id);
    return deleteDoc(dataRef);
  }

  // Update a document in the collection
  update(id: string, data: any, path: string) {
    const dataRef = doc(this.firestore, path, id);
    return updateDoc(dataRef, data);
  }

  // Search a document in the collection
  search(field: string, value: string, path: string): Observable<any[]> {
    const QWhere = where(field, '==', value);
    const dataRef = query(collection(this.firestore, path), QWhere);
    return collectionData(dataRef, { idField: 'id' }) as Observable<any[]>;
  }
}
