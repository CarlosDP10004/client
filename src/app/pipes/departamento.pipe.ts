import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'departamento'
})
export class DepartamentoPipe implements PipeTransform {

  transform(value: any , args?: any ): any {    
    if (!value)return null;
    if (!args)return value;    
    const resultPosts = [];   
    for(const departament of value){
      if(departament.IdUnidad.toString().toLowerCase().includes(args.toLowerCase())
      ||departament.CodigoUnidad.toString().toLowerCase().includes(args.toLowerCase())
      || departament.NombreUnidad.toLowerCase().includes(args.toLowerCase()) 
      || departament.NombreUsuario.toString().toLowerCase().includes(args.toLowerCase())      
       )
      {
        resultPosts.push(departament);      };
      };
    return resultPosts;    
  }

}
