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
  private active = 0;
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.isLogged = this.auth.isLogged();
  }

  getActive() {
    return this.active;
  }

  setActive(active: number) {
    this.active = active;
  }

  signOut() {
    this.auth.signOut();
    this.router.navigate(['sign-in']);
  }

  signIn() {
    this.router.navigate(['sign-in']);
    this.setActive(2);
  }

  signUp() {
    this.router.navigate(['sign-up']);
    this.setActive(3);
  }

  profiles() {
    this.router.navigate(['profiles']);
    this.setActive(0);
  }

  offers() {
    this.router.navigate(['offerts']);
    this.setActive(1);
  }
}
