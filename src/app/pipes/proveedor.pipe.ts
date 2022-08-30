import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'proveedor'
})
export class ProveedorPipe implements PipeTransform {

  transform(value: any , args?: any ): any {    
    if (!value)return null;
    if (!args)return value;    
    const resultPosts = [];   
    for(const provider of value){
      if(provider.IdProveedor.toString().toLowerCase().includes(args.toLowerCase())
      || provider.DocumentoProveedor.toLowerCase().includes(args.toLowerCase())  
      || provider.NombreProveedor.toLowerCase().includes(args.toLowerCase()) )      
      {
        resultPosts.push(provider);      };
      };
    return resultPosts;    
  }

}
