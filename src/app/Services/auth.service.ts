import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Empleado } from '../Models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private authFirebase: AngularFireAuth) { }

  signIn(email: string, password: string) {
    return this.authFirebase.signInWithEmailAndPassword(email, password).then((result) => {
      localStorage.setItem('user', JSON.stringify(result.user));
    });
  }

  signUp(data: Empleado) {
    return this.authFirebase.createUserWithEmailAndPassword(data.email, data.password);
  }

  signOut() {
    return this.authFirebase.signOut().then(() => {
      localStorage.removeItem('user');
    }
    );
  }

  isAuth() {
    return this.authFirebase.authState;
  }

  isLogged() {
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user !== null) {
      return true;
    }
    return false;
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user')!);
  }
}
