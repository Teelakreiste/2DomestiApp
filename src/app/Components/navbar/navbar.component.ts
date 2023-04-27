import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
  isLogged: boolean = false;
  name: string = '';
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
    this.info();
  }

  signOut() {
    this.auth.signOut().then(() => {
      this.isLogged = false;
    });
  }

  info() {
    this.auth.searchUser().subscribe(data => {
      this.name = data[0].name;
    });
  }
}
