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

    const days = Math.trunc(seconds / TimeConstants.day);
    const hours = Math.trunc((seconds % TimeConstants.day) / TimeConstants.hour);
    const minutes = Math.trunc((seconds % TimeConstants.hour) / TimeConstants.minute);
    seconds = Math.trunc(seconds % TimeConstants.minute);

    let result: string[] = [];
    if(days > 0) result.push(days + 'd');
    if(hours > 0) result.push(hours + 'h');
    if(minutes > 0) result.push(minutes + 'm');
    if(seconds > 0) result.push(seconds + 's');

    return result.slice(0,3).join(' ');
  }

}
