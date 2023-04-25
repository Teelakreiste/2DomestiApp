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
  user: string = '';
  constructor(private auth: AuthService,
    private bdDomestiAppService: BdDomestiAppService
    ) { }

  ngOnInit(): void {
    this.auth.isLogged().then(() => {
      this.isLogged = true;
      
    }).catch(() => {
      this.isLogged = false;
    });
  }

  signOut() {
    this.auth.signOut().then(() => {
      this.isLogged = false;
    });
  }

  getName() {
    this.bdDomestiAppService.getEmployees
  }

}
