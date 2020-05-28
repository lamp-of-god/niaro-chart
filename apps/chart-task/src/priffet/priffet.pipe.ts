import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priffet'
})
export class PriffetPipe implements PipeTransform {

  transform(value: string): string {
    let out = '';
    for (let i = 0; i < value.length; i++) {
      if (i%2 === 0) {
        out += value[i].toLowerCase();
      } else {
        out += value[i].toUpperCase();
      }
    }
    return out;
  }

}
