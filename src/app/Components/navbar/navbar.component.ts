import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { BdDomestiAppService } from 'src/app/Services/bd-domesti-app.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLogged: boolean = false;
  constructor(private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.auth.isAuth().subscribe(auth => {
      if (auth) {
        this.isLogged = true;
      } else {
        this.isLogged = false;
      }
    })
  }

  signOut() {
    this.auth.signOut().then(() => {
      this.isLogged = false;
    });
  }

}
