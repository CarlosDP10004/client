import { formatCurrency, getCurrencySymbol } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  constructor() { }

  calculateDepreciation(esTangible: boolean, values: any){
    let text = "No aplica";
    if(esTangible){
      if(values.ValorCompra != '' && values.ValorCompra >= 600.00){
        if(values.VidaUtil != '' && values.FechaCompra != '' && values.ValorCompra != ''){
          let years = Math.floor((new Date().getTime() - new Date(values.FechaCompra).getTime()) / 31536000000);
          if(years >= values.VidaUtil){
            text = this.updateValue(values.ValorCompra).toString();
          }else{
            text = this.updateValue(((values.ValorCompra / values.VidaUtil) * years)).toString();
          }
        }
      }
    }
    return text;
  }

  calculateAmortization(esTangible: boolean, values: any){
    let text = "No aplica";
    if(!esTangible){
      if(values.ValorCompra != '' && values.ValorCompra >= 600.00){
        if(values.VidaUtil != '' && values.FechaCompra != '' && values.ValorCompra != ''){
          let years = Math.floor((new Date().getTime() - new Date(values.FechaCompra).getTime()) / 31536000000);
          if(years >= values.VidaUtil){
            text = this.updateValue(values.ValorCompra).toString();
          }else{
            text = this.updateValue(((values.ValorCompra / values.VidaUtil) * years)).toString();
          }
        }
      }
    }
    return text;
  }

  calculateCurrentValue(esTangible: boolean, values: any){
    let text = "No aplica";
    if(values.ValorCompra != '' && values.ValorCompra >= 600.00){
      if(values.VidaUtil != '' && values.FechaCompra != '' && values.ValorCompra != ''){
        let years = Math.floor((new Date().getTime() - new Date(values.FechaCompra).getTime()) / 31536000000);
        if(years >= values.VidaUtil){
          text = this.updateValue(values.ValorCompra * 0.10).toString();
        }else{
          text = this.updateValue((values.ValorCompra - ((values.ValorCompra / values.VidaUtil) * years))).toString();
        }
      }
    }
    return text;
  }


  updateValue(value: any) {
    let val = parseFloat(value);
    if (Number.isNaN(val)) {
      val = 0;
    }
    return formatCurrency(val, 'en-US', getCurrencySymbol('USD', 'wide'));
  }
}
