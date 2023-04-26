import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Empleado } from '../Models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private authFirebase: AngularFireAuth) { }

  signIn(email: string, password: string) {
    return this.authFirebase.signInWithEmailAndPassword(email, password);
  }

  signUp(data: Empleado) {
    return this.authFirebase.createUserWithEmailAndPassword(data.email, data.password);
  }

  signOut() {
    return this.authFirebase.signOut();
  }

  isAuth() {
    return this.authFirebase.authState;
  }
}
