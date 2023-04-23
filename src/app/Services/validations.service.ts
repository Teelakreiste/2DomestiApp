import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {

  constructor() { }

  validateEmail(email: string) {
    const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; // Returns true if the string is a valid email
    return re.test(email) && !this.isEmpty(email);
  }

  validatePassword(password: string) {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/; // Is valid if the string contains at least 8 characters, at least one uppercase letter, one lowercase letter and one number
    return re.test(password) && !this.isEmpty(password);
  }

  validatePhone(phone: string) {
    const re = /^[0-9]{10}$/; // Is valid if the string contains only 10 numbers
    return re.test(phone) && !this.isEmpty(phone);
  }

  validateCC(cc: string) {
    const re = /^[0-9]{10}$/; // Is valid if the string contains only 10 numbers
    return re.test(cc) && !this.isEmpty(cc);
  }

  validateRol(rol: string) {
    const re = /^Empleado$|^Empleador$/; // Is valid if the string contains only "Empleado" or "Empleador"
    return re.test(rol) && !this.isEmpty(rol);
  }

  validateStatus(status: string) {
    const re = /^Activo$|^Inactivo$/; // Is valid if the string contains only "Activo" or "Inactivo"
    return re.test(status) && !this.isEmpty(status);
  }

  validateExperience(experience: string) {
    const re = /^[a-zA-Z0-9\s,'-]*$/; // Is valid if the string contains only letters, numbers, spaces, commas, apostrophes and hyphens
    return re.test(experience) && !this.isEmpty(experience);
  }

  validateOthers(others: string) {
    const re = /^[a-zA-Z0-9\s,'-]*$/; // Is valid if the string contains only letters, numbers, spaces, commas, apostrophes and hyphens
    return re.test(others) && !this.isEmpty(others);
  }

  validateName(name: string) {
    const re = /^[a-zA-Z\s,'-]*$/; // Is valid if the string contains only letters, spaces, commas, apostrophes and hyphens
    return re.test(name) && !this.isEmpty(name);
  }

  validateImage(image: string) {
    const re = /^.*\.(jpg|jpeg|png)$/; // Is valid if the string contains only jpg, jpeg or png
    return re.test(image) && !this.isEmpty(image);
  }

  isEmpty(value: string) {
    return (value == null || value.length === 0); // Returns true if the string is empty
  }

  validateAll(employeed: any) {
    if (!this.isEmpty(employeed.rol)) {
      if (employeed.rol == "Empleado") {
        return (this.validateName(employeed.name) &&
          this.validateEmail(employeed.email) &&
          this.validatePassword(employeed.password) &&
          this.validatePhone(employeed.phone) &&
          this.validateCC(employeed.cc) &&
          !this.isEmpty(employeed.expDate) &&
          this.validateRol(employeed.rol) &&
          this.validateExperience(employeed.experience) &&
          !this.isEmpty(employeed.photo));
      } else if (employeed.rol == "Empleador") {
        return (this.validateName(employeed.name) &&
          this.validateEmail(employeed.email) &&
          this.validatePassword(employeed.password) &&
          this.validatePhone(employeed.phone) &&
          this.validateCC(employeed.cc) &&
          !this.isEmpty(employeed.expDate) &&
          this.validateRol(employeed.rol) &&
          !this.isEmpty(employeed.address) &&
          !this.isEmpty(employeed.photo));
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
