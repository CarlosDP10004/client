import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plaza'
})
export class PlazaPipe implements PipeTransform {

  transform(value: any , args?: any ): any {    
    if (!value)return null;
    if (!args)return value;    
    const resultPosts = [];   
    for(const workStation of value){
      if(workStation.IdPlaza.toString().toLowerCase().includes(args.toLowerCase())
      || workStation.NombrePlaza.toLowerCase().includes(args.toLowerCase()) 
      || workStation.NombreEmpleado.toLowerCase().includes(args.toLowerCase()) 
      || workStation.NombreUnidad.toString().toLowerCase().includes(args.toLowerCase())      
       )
      {
        resultPosts.push(workStation);      };
      };
    return resultPosts;    
  }

}
