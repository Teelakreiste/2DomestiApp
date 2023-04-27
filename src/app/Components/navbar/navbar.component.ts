import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
  isLogged: boolean = false;
  name: string = '';
  private id: string = '';
  constructor(private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.auth.isAuth().subscribe(auth => {
    //   if (auth) {
    //     this.isLogged = true;
    //   } else {
    //     this.isLogged = false;
    //   }
    // })
    
    this.isLogged = this.auth.isLogged();
    this.info();
  }

  signOut() {
    this.auth.signOut().then(() => {
      this.isLogged = false;
      this.router.navigate(['/home']);
    });
  }

  info() {
    this.auth.searchUser().subscribe(data => {
      this.name = data[0].name;
      this.id = data[0].id!;
    });
  }

  settingProfile() {
    this.router.navigate(['/setting-profile/' + this.id]);
  }

}
