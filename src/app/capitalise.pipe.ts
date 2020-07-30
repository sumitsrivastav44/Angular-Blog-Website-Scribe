import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalise'
})
export class CapitalisePipe implements PipeTransform {

  transform(value: string , ...args: any[]): any {
    let firstChar = value.substring(0,1);
    let allOtherChar = value.substring(1,value.length-1);

    let newValue = firstChar.toUpperCase() + allOtherChar.toLowerCase();

    return newValue;
  }

}
