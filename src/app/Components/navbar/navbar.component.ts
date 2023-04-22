import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Empleado } from 'src/app/Models/employee.model';
import { AuthService } from 'src/app/Services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLogged: boolean = false;
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.isLogged = this.auth.isLogged();
  }

  signOut() {
    this.auth.signOut();
    this.router.navigate(['sign-in']);
  }

  signIn() {
    this.router.navigate(['sign-in']);
  }

  signUp() {
    this.router.navigate(['sign-up']);
  }

  profiles() {
    this.router.navigate(['profiles']);
  }

  offers() {
    this.router.navigate(['offerts']);
  }
}
