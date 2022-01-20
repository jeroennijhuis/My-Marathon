import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Pipe, PipeTransform } from '@angular/core';
import { TimeConstants } from '../constants/time.contstants';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  constructor(private translatePipe: TranslatePipe) {

  }

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
    if(days > 0) result.push(days + this.translatePipe.transform('time.day.short'));
    if(hours > 0) result.push(hours + this.translatePipe.transform('time.hour.short'));
    if(minutes > 0) result.push(minutes + this.translatePipe.transform('time.minute.short'));
    if(seconds > 0) result.push(seconds + this.translatePipe.transform('time.second.short'));

    return result.slice(0,3).join(' ');
  }

}
