import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'documento'
})
export class DocumentoPipe implements PipeTransform {

  transform(value: any): any {
    return value.length < 9 ? value : ( value.length < 14 ? this.format(value, 8) :this.format(this.format(this.format(value, 4), 11), 15));    
  }

  format(array: string, posicion: number) {
    return array.substring(0, posicion) + "-" + array.substring(posicion, array.length);  
  }

}
