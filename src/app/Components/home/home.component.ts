import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor( private router: Router,
    private auth: AuthService) { }

  ngOnInit() {
    // this.auth.isLogged().then(() => {
    //   console.log('Usuario logueado');
    // }).catch(() => {
    //   console.log('No hay usuario logueado');
    //   this.router.navigate(['sign-in']);
    // });
  }

  logout() {
    this.auth.signOut().then(() => {
      console.log('Usuario deslogueado exitosamente!');
      this.router.navigate(['sign-in']);
    }).catch(() => {
      console.log('Error al desloguear usuario');
    });
  }

}
