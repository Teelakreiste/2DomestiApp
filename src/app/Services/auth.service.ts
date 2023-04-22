import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Empleado } from '../Models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private logged: boolean = false;
  constructor(private authFirebase: AngularFireAuth) { }

  signIn(email: string, password: string) {
    this.logged = true;
    return this.authFirebase.signInWithEmailAndPassword(email, password);
  }

  signUp(data: Empleado) {
    this.logged = false;
    return this.authFirebase.createUserWithEmailAndPassword(data.email, data.password);
  }

  signOut() {
    this.logged = false;
    return this.authFirebase.signOut();
  }
  
  isLogged() {
    // return this.authFirebase.currentUser;
    return this.logged;
  }
}
