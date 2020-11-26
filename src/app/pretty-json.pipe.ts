import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prettyJson',
  pure:false
})
export class PrettyJsonPipe implements PipeTransform {

  transform(val) {
    const regex = /"/g;
    return JSON.stringify(val, null, 2).replace(regex, '');

  }

}
