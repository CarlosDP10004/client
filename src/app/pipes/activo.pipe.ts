import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activo'
})
export class ActivoPipe implements PipeTransform {

  transform(value: any, args?: any) {    
    if (!value)return null;
    if (!args)return value;    
    const resultPosts = [];   
    for(const asset of value){
      if(asset.Descripcion.toLowerCase().includes(args.toLowerCase()) 
      || asset.Marca.toLowerCase().includes(args.toLowerCase())
      || asset.Modelo.toLowerCase().includes(args.toLowerCase())
      || asset.ValorCompra.toLowerCase().includes(args.toLowerCase())
      || asset.CodigoAF.toLowerCase().includes(args.toLowerCase())
      || asset.FechaCompra.includes(args)
      || asset.NombreEstado.toLowerCase().includes(args.toLowerCase()) )
      {
        resultPosts.push(asset);      };
      };
    return resultPosts;    
  }

}
