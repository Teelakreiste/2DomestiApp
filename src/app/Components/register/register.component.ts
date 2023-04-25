import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Empleado } from 'src/app/Models/employee.model';
import { AuthService } from 'src/app/Services/auth.service';
import { BdDomestiAppService } from 'src/app/Services/bd-domesti-app.service';
import { ImageService } from 'src/app/Services/image.service';
import { ValidationsService } from 'src/app/Services/validations.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  seasonSelected = 'Winter';
  isChecked = true;
  sh = 1;
  index = false;
  imgSrc = "../../../assets/Placeholder.svg"
  private selectedImage: any = null;


  employeed: Empleado = {
    name: '',
    email: '',
    password: '',
    phone: '',
    cc: '',
    expDate: '',
    address: '',
    rol: '',
    status: '',
    photo: '',
    experience: '',
    others: ''
  }

  constructor(private router: Router,
    private auth: AuthService,
    private imageService: ImageService,
    private bdDomestiAppService: BdDomestiAppService,
    private validations: ValidationsService) { }

  ngOnInit() {
    // if (this.auth.isLogged()) {
    //   this.router.navigate(['home']);
    // }
  }

  login() {
    this.router.navigate(['sign-in']);
  }

  submit() {
    this.employeed.rol = ((this.sh == 1) ? 'Empleado' : 'Empleador');
    if (this.validations.validateAll(this.employeed)) {
      this.saveImage();
    } else {
      window.alert('Fill all the fields');
    }
  }

  saveImage() {
    var filePath = `${((this.sh == 1) ? 'Empleados' : 'Empleadores')}/${this.employeed.name+this.employeed.cc}/${this.selectedImage}-${new Date().getTime()}`;
      const fileRef = this.imageService.getRef(filePath);

      this.imageService.uploadImage(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.index = true;
            this.employeed.photo = url;
            this.saveEmployee();
          });
        })
      ).subscribe();
  }

  register() {
    this.auth.signUp(this.employeed).then(() => {
      console.log('Usuario creado exitosamente!');
      this.router.navigate(['sign-in']);
    }).catch(error => {
      console.log(error);
    });
  }

  async saveEmployee() {
    const response = await this.bdDomestiAppService.saveEmployee(this.employeed);
    console.log(response);
    if (response) {
      window.alert('Empleado guardado exitosamente!');
      this.register();
      this.router.navigate(['sign-in']);
    } else {
      this.index = false;
      window.alert('Error al guardar el empleado!');
    }
    
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.imgSrc = '';
      this.selectedImage = null;
    }
  }

  resetForm() {
    this.imgSrc = "../../../assets/Placeholder.svg";
    this.selectedImage = null;
    this.index = false;
    this.employeed.name = '';
    this.employeed.email = '';
    this.employeed.password = '';
    this.employeed.phone = '';
    this.employeed.cc = '';
    this.employeed.expDate = '';
    this.employeed.address = '';
    this.employeed.rol = '';
    this.employeed.status = '';
    this.employeed.photo = '';
    this.employeed.experience = '';
    this.employeed.others = '';
  }

  isEmpty(str: string) {
    return this.validations.isEmpty(str);
  }


  validates(index: number) {
    switch (index) {
      case 0: 
        return this.validations.validateName(this.employeed.name); 
      case 1:
        return this.validations.validateEmail(this.employeed.email);
      case 2:
        return this.validations.validatePassword(this.employeed.password);
      case 3:
        return this.validations.validatePhone(this.employeed.phone);
      case 4:
        return this.validations.validateCC(this.employeed.cc);
      case 5:
        return this.validations.validateExperience(this.employeed.experience!);
      default:
        return false;
    }
  }
}
