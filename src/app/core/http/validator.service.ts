import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  validEmail(element: string): ValidatorFn{
    return(control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup;
      const regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
      const value = formGroup.get(element)?.value;
      if(regex.test(value) || value == null || value == ''){
        return null;
      }else{
        return {valueNotValid: true}
      }
    }

  }
}
