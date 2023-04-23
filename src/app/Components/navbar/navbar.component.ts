import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLogged: boolean = false;
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.isLogged = this.auth.isLogged();
  }
}
