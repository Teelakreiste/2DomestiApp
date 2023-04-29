import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { DbService } from 'src/app/Services/db.service';
import { Requests } from 'src/app/Models/requests.model';

import Swal from 'sweetalert2';
import { Empleado } from 'src/app/Models/employee.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
  isLogged: boolean = false;
  name: string = '';
  infoRequest: Empleado = {
    name: '',
    email: '',
    phone: '',
    photo: '',
    rol: '',
    id: '',
    cc: '',
    address: '',
    expDate: '',
    experience: '',
    others: '',
    password: '',
    status: ''
  };
  private id: string = '';

  notifications: Requests[] = [];
  notificationsA: Requests[] = [];

  constructor(private auth: AuthService,
    private router: Router,
    private dbService: DbService
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
    this.getNotification();
    this.getNotificationAccepted();
  }

  signOut() {
    this.auth.signOut().then(() => {
      this.isLogged = false;
      this.router.navigate(['/home']);
    });
  }

  info() {
    if (this.isLogged) {
      this.auth.searchUser().subscribe(data => {
        this.name = data[0].name;
        this.id = data[0].id!;
      });
    } else {
      this.name = '';
    }
  }

  settingProfile() {
    this.router.navigate(['/setting-profile/' + this.id]);
  }

  getNotification() {
    this.dbService.getAll('requests').subscribe(data => {
      this.notifications = data.filter((request) => {
        return (request.idOffer === this.id && request.state === 'Pendiente' && request.isAccepted === false);
      });
    })
  }

  getNotificationAccepted() {
    this.dbService.getAll('requests').subscribe(data => {
      this.notificationsA = data.filter((request) => {
        return (request.idApplicant === this.id && request.state === 'Aceptada' && request.isAccepted === false);
      });
    })
  }

  viewNotification(request: Requests) {
    this.dbService.search('id', request.idApplicant!, 'employees').subscribe(data => {
      this.infoRequest = data[0];
      Swal.fire({
        html: `
      <div class="row">
        <div class="col-6">
          <img src="${this.infoRequest.photo}" class="img-fluid" alt="Responsive image">
        </div>
        <div class="col-6">
          <h5 class="card-title">${this.infoRequest.name}</h5>
          <p class="card-text">${this.infoRequest.email}</p>
          <p class="card-text">${this.infoRequest.phone}</p>
          <p class="card-text">${this.infoRequest.address}</p>
          <p class="card-text">${this.infoRequest.experience}</p>
          <p class="card-text">${this.infoRequest.others}</p>
        </div>
      </div>
      `,
        title: '¿Desea aceptar la oferta?',
        text: "No podrá revertir esta acción",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#716add',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          // request.isAccepted = true;
          request.state = 'Aceptada';
          this.dbService.update(request.id!, request, 'requests').then(() => {
            Swal.fire(
              '¡Oferta aceptada!',
              'La oferta ha sido aceptada',
              'success'
            )
          }).catch((error) => {
            Swal.fire(
              '¡Error!',
              'La oferta no ha podido ser aceptada',
              'error'
            )
          })
        }
      })
    })
  }

  viewNotificationAccepted(request: Requests) {
    this.dbService.search('id', request.idOffer!, 'employees').subscribe(data => {
      this.infoRequest = data[0];
      Swal.fire({
        html: `
      <div class="row">
        <div class="col-6">
          <img src="${this.infoRequest.photo}" class="img-fluid" alt="Responsive image">
        </div>
        <div class="col-6">
          <h5 class="card-title">${this.infoRequest.name}</h5>
          <p class="card-text">${this.infoRequest.email}</p>
          <p class="card-text">${this.infoRequest.phone}</p>
          <p class="card-text">${this.infoRequest.address}</p>
          <p class="card-text">${this.infoRequest.experience}</p>
          <p class="card-text">${this.infoRequest.others}</p>
        </div>
      </div>
      `,
        title: 'Esta oferta ha sido aceptada',
        text: "El usuario ha aceptado tu oferta y se pondrá en contacto contigo pronto.",
        icon: 'success',
        confirmButtonColor: '#716add',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
      }).then((result) => {
        if (result.isConfirmed) {
          request.isAccepted = true;
          this.dbService.update(request.id!, request, 'requests').then(() => {
            Swal.fire(
              '¡Oferta aceptada!',
              'La oferta ha sido aceptada',
              'success'
            )
          })
        }
      })
    })
  }

}
