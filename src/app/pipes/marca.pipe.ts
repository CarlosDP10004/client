import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'marca'
})
export class MarcaPipe implements PipeTransform {

  transform(value: any , args?: any ): any {    
    if (!value)return null;
    if (!args)return value;    
    const resultPosts = [];   
    for(const brand of value){
      if(brand.IdMarca.toString().toLowerCase().includes(args.toLowerCase())
      || brand.NombreMarca.toLowerCase().includes(args.toLowerCase())        
       )
      {
        resultPosts.push(brand);      };
      };
    return resultPosts;    
  }

}
