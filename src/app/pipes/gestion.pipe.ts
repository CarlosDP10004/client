import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gestion'
})
export class GestionPipe implements PipeTransform {

  transform(value: any, args?: any): any {    
    if (!value)return null;
    if (!args)return value;    
    const resultPosts = [];   
    for(const asset of value){
      if(asset.CodigoAF.toLowerCase().includes(args.toLowerCase())
      || asset.Fecha_Solicitud.toString().toLowerCase().includes(args.toLowerCase()) 
      || asset.Fecha_Retorno.toString().toLowerCase().includes(args.toLowerCase())
      || asset.JefeUnidadActual.toLowerCase().includes(args.toLowerCase())
      || asset.Solicitante.toLowerCase().includes(args.toLowerCase())
       )
      {
        resultPosts.push(asset);      };
      };
    return resultPosts;    
  }

}