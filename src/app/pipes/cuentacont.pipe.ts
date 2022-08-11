import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cuentacont'
})
export class CuentacontPipe implements PipeTransform {

  transform(value: any , args?: any ): any {    
    if (!value)return null;
    if (!args)return value;    
    const resultPosts = [];   
    for(const account of value){
      if(account.IdCuenta.toString().toLowerCase().includes(args.toLowerCase())
      || account.Codigo.toString().toLowerCase().includes(args.toLowerCase()) 
      || account.NombreCuenta.toString().toLowerCase().includes(args.toLowerCase())      
      
       )
      {
        resultPosts.push(account);      };
      };
    return resultPosts;    
  }


}
