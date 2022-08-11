import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prestamouni'
})
export class PrestamouniPipe implements PipeTransform {

  transform(value: any, args?: any): any {    
    if (!value)return null;
    if (!args)return value;    
    const resultPosts = [];   
    for(const request of value){
      if(request.IdSolicitud.toString().toLowerCase().includes(args.toLowerCase())      
      || request.Solicitante.toString().toLowerCase().includes(args.toLowerCase())      
      || request.Fecha_Solicitud.toString().toLowerCase().includes(args.toLowerCase())      
      || request.NombreEstado.toLowerCase().includes(args.toLowerCase())       
       )
      {
        resultPosts.push(request);      };
      };
    return resultPosts;    
  }

}