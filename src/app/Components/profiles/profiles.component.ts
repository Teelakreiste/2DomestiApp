import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { Empleado } from 'src/app/Models/employee.model';
import { BdDomestiAppService } from 'src/app/Services/bd-domesti-app.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent {

  profile = [];


  constructor(private router: Router,
    private auth: AuthService,
    private bdDomestiAppService: BdDomestiAppService) { }

  ngOnInit() {
  }

  getEmployee() {
    this.bdDomestiAppService.getEmployee().subscribe((data: {}) => {
      this.profile 
    })
  }

}
