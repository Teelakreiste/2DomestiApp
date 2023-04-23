import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { Empleado } from 'src/app/Models/employee.model';
import { BdDomestiAppService } from 'src/app/Services/bd-domesti-app.service';

@Component({
  selector: 'app-offerts',
  templateUrl: './offerts.component.html',
  styleUrls: ['./offerts.component.css']
})
export class OffertsComponent {
  offerts: Empleado[] = [];


  constructor(private router: Router,
    private auth: AuthService,
    private bdDomestiAppService: BdDomestiAppService) { }

  ngOnInit() {
    this.getEmployee();
  }

  getEmployee() {
    this.bdDomestiAppService.getEmployees().subscribe(data => {
      // Get only the employees with the rol of "Empleador"
      this.offerts = data.filter((employee) => {
        return employee.rol === "Empleador";
      });      
    })
  }
}
