import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prestamoex'
})
export class PrestamoexPipe implements PipeTransform {

  transform(value: any, args?: any): any {    
    if (!value)return null;
    if (!args)return value;    
    const resultPosts = [];   
    for(const item of value){
      if(item.CodigoAF.toLowerCase().includes(args.toLowerCase())      
       )
      {
        resultPosts.push(item);      };
      };
    return resultPosts;    
  }

}