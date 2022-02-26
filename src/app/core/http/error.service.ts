import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  getErrorMessage(error){
    return typeof error.message === 'string' || error.message instanceof String
        ? error.message
        : this.getValidations(error.message);
  }

  getValidations(message){
    var messageString = "";
    var properties = Object.getOwnPropertyNames(message);
    for (let i = 0; i < properties.length; i++)
    {
        let currentProperty = properties[i];
        //messageString += currentProperty + ": " + message[currentProperty][0];
        messageString += `\n` + message[currentProperty][0];
    }
    return messageString;
  }
}
