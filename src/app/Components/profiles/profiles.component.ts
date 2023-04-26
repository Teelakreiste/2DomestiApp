import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { Empleado } from 'src/app/Models/employee.model';
import { BdDomestiAppService } from 'src/app/Services/bd-domesti-app.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent {

  profiles: Empleado[] = [];


  constructor(private router: Router,
    private auth: AuthService,
    private bdDomestiAppService: BdDomestiAppService) { }

  ngOnInit() {
    this.getEmployee();
  }

  getEmployee() {
    this.bdDomestiAppService.getEmployees().subscribe(data => {
      this.bdDomestiAppService.getEmployees().subscribe(data => {
        // Get only the employees with the rol of "Empleado"
        this.profiles = data.filter((employee) => {
          return employee.rol === "Empleado";
        });
      })
    })
  }

  viewMoreInfo(profile: Empleado) {
    // Swal.fire({
    //   title: profile.name,
    //   text: 'Modal with a custom image.',
    //   imageUrl: profile.photo,
    //   imageWidth: 400,
    //   imageHeight: 400,
    //   imageAlt: 'Custom image',
    //   width: 600,
    //   padding: '3em',
    //   color: '#716add',
    //   backdrop: `rgba(0,0,123,0.4)`
    // })
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Profile information',
      html: `
      <div class="row">
        <div class="col-md-6">
          <img src="${profile.photo}" alt="profile photo" class="img-fluid">
        </div>
        <div class="col-md-6">
          <p><strong>Nombre:</strong> ${profile.name}</p>

          <p><strong>Experiencia:</strong> ${profile.experience}</p>
          <p><strong>Descripción:</strong> ${profile.others}</p>
          <p><strong>Disponibilidad:</strong> ${profile.status}</p>
          <p><strong>Correo:</strong> ${profile.email}</p>
          <p><strong>Teléfono:</strong> ${profile.phone}</p>
        </div>
      </div>
      `,
      width: 600,
      padding: '3em',
      color: '#716add',
      backdrop: `rgba(0,0,0,0.4)`,
      confirmButtonText: 'Request service',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Request sent',
          'Your request has been sent, we will contact you soon.',
          'success'
        )
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
      }
    })
  }

}
