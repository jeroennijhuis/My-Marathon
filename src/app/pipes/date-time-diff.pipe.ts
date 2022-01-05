import { Pipe, PipeTransform } from '@angular/core';
import { TimeConstants } from '../constants/time.contstants';

@Pipe({
  name: 'dateTimeDiff'
})
export class DateTimeDiffPipe implements PipeTransform {

  transform(time: any, _args?: any): any {
    if (time) {
      switch (typeof time) {
          case 'number':
              break;
          case 'string':
              time = +new Date(time);
              break;
          case 'object':
              if (time.constructor === Date) time = time.getTime();
              break;
          default:
              time = +new Date();
      }

      var formats = new Map<string, number>();
      formats.set('second', 1);
      formats.set('minute', TimeConstants.minute);
      formats.set('hour',   TimeConstants.hour);
      formats.set('day',    TimeConstants.day);
      formats.set('month',  TimeConstants.month);
      formats.set('year',   TimeConstants.year);
      formats.set('',       Number.MAX_SAFE_INTEGER);

      const diffInSeconds = (+new Date() - time) / 1000;

      let prevKey: string | null = null;
      let prevValue: number  | null = null;

      for(let key of formats.keys()) {
        const value = formats.get(key)!;

        if(diffInSeconds < value && !!prevKey && !!prevValue){
          const count = Math.round(diffInSeconds / prevValue);
          const unity = count < 2 ? prevKey : `${prevKey}s`;

          return `${count.toFixed()} ${unity} ago`;
        }

        prevKey = key;
        prevValue = value;
      }
    }

    return '';
  }
}
