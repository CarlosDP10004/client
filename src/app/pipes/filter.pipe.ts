import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value)return null;
    if (!args)return value;
    const resultPosts = [];   
    for(const classification of value){
      if(classification.IdClasificacion.toString().includes(args)
      || classification.NombreCuenta.toLowerCase().includes(args.toLowerCase()) 
      || classification.Descripcion.toLowerCase().includes(args.toLowerCase()) )
      {
        resultPosts.push(classification);      };
      };
    return resultPosts;    
  
  }
    
  

}