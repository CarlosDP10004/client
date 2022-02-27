import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, para: any): any {
    if (!value)return null;
    if (!para)return value;
    const resultPosts = [];   
    for(const classification of value){
      if(classification.NombreCuenta.toLowerCase().indexOf(para.toLowerCase()) !== -1
      || classification.Descripcion.toLowerCase().indexOf(para.toLowerCase()) !== -1)
      {
        resultPosts.push(classification);      };
      };
    return resultPosts;    
  
  }
    
  

}