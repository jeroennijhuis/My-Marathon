import { Pipe, PipeTransform } from '@angular/core';
import { TimeConstants } from '../constants/time.contstants';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(seconds: any, args?: any): any {
    switch (typeof seconds) {
      case 'number':
          break;
      default:
          return '';
    }

    const hours = Math.trunc(seconds / TimeConstants.hour);
    const minutes = Math.trunc((seconds % TimeConstants.hour) / TimeConstants.minute);
    seconds = Math.trunc(seconds % TimeConstants.minute);

    let result = '';
    if(hours > 0) result += (hours + 'h');
    if(minutes > 0) result += (' ' + minutes + 'm');
    if(seconds > 0) result += (' ' + seconds + 's');

    result.trim();
    return result;
  }

}
