import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  seasonSelected = 'Winter';
  isChecked = true;
  sh = 1;
  constructor(private router: Router) { }

  ngOnInit() { }

  login() {
    this.router.navigate(['sign-in']);
  }
}
