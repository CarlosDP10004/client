import { formatCurrency, getCurrencySymbol } from '@angular/common';
import { Injectable } from '@angular/core';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  base: any;

  constructor(
    private settingService: SettingsService,
  ) {
    this.settingService.getBase().subscribe(data => {
      this.base = data;  
    });
  }

  calculateDepreciation(esTangible: boolean, values: any){
    let text = "No aplica";
    if(esTangible){
      if(values.ValorCompra != '' && parseFloat(values.ValorCompra) >= this.base.ValorDecimal){
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
      if(values.ValorCompra != '' && parseFloat(values.ValorCompra) >= this.base.ValorDecimal){
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
    if(values.ValorCompra != '' && parseFloat(values.ValorCompra) >= this.base.ValorDecimal){
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

  calculateRevaluation(asset: any, values: any){
    let text = "Calculando...";
    let currentValue = 0;
      if(values.VidaUtil != '' && values.Costo != '' && values.VidaUtil != null && values.Costo != null){
        asset.mantenimiento.forEach(element => {
          if(element.EsRevalorizable && element.Ultimo){
            let years = Math.floor((new Date().getTime() - new Date(element.FechaFin).getTime()) / 31536000000);
            currentValue = (parseFloat(values.Costo) + (element.Revalorizacion - ((element.Revalorizacion / element.VidaUtil) * years))) * 1.00;
            text = currentValue.toString();
          }
        });
        if(currentValue == 0){
          let years = Math.floor((new Date().getTime() - new Date(asset.FechaCompra).getTime()) / 31536000000);          
          currentValue = (parseFloat(values.Costo) + (asset.ValorCompra - ((asset.ValorCompra / asset.VidaUtil) * years))) * 1.00;
          text = currentValue.toString();
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
