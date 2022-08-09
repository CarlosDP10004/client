import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'asig'
})
export class AsigPipe implements PipeTransform {

  transform(value: any, args?: any): any {    
    if (!value)return null;
    if (!args)return value;    
    const resultPosts = [];   
    for(const assignment of value){
      if(assignment.IdAsignacion.toString().toLowerCase().includes(args.toLowerCase())
      || assignment.NombreUnidad.toLowerCase().includes(args.toLowerCase()) 
      || assignment.NombrePlaza.toString().toLowerCase().includes(args.toLowerCase())      
      || assignment.Fecha_Asignacion.toString().toLowerCase().includes(args.toLowerCase())      
       )
      {
        resultPosts.push(assignment);      };
      };
    return resultPosts;    
  }

}
