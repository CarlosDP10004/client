import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usuario'
})
export class UsuarioPipe implements PipeTransform {

  transform(value: any, args?:any)  {    
    if (!value)return null;
    if (!args)return value;        
    const resultPosts = [];   
    for(const user of value){
      if(user.IdUsuario.toString().includes(args)
      || user.NombreUsuario.toLowerCase().includes(args.toLowerCase())
      || user.Intento.toString().includes(args) 
      || user.Estado.toString().includes(args))
      {
        resultPosts.push(user);      };
      };
    return resultPosts;   
    
    

  }

}
