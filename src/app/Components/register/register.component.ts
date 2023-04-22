import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Empleado } from 'src/app/Models/employee.model';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  seasonSelected = 'Winter';
  isChecked = true;
  sh = 1;

  employeed: Empleado = {
    name: '',
    email: '',
    password: '',
    phone: '',
    cc: '',
    expDate: '',
    address: '',
    rol: '',
    status: '',
    photo: '',
    experience: '',
    others: ''
  }

  constructor(private router: Router,
    private auth: AuthService) { }

  ngOnInit() {
    this.auth.isLogged().then(() => {
      this.router.navigate(['home']);
    }).catch(() => {
      console.log('No hay usuario logueado');
    });
  }

  login() {
    this.router.navigate(['sign-in']);
  }

  register() {
    this.auth.signUp(this.employeed).then(() => {
      console.log('Usuario creado exitosamente!');
      this.router.navigate(['sign-in']);
    }).catch(error => {
      console.log(error);
    });
  }
}
