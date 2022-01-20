import { Pipe, PipeTransform } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { TimeConstants } from '../constants/time.contstants';

@Pipe({
  name: 'dateTimeDiff'
})
export class DateTimeDiffPipe implements PipeTransform {

  constructor(private translatePipe: TranslatePipe) {
  }

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

      var formats = new Map<string[], number>();
      formats.set(['time.second.singular',  'time.second.plural'],  1);
      formats.set(['time.minute.singular',  'time.minute.plural'],  TimeConstants.minute);
      formats.set(['time.hour.singular',    'time.hour.plural'],    TimeConstants.hour);
      formats.set(['time.day.singular',     'time.day.plural'],     TimeConstants.day);
      formats.set(['time.month.singular',   'time.month.plural'],   TimeConstants.month);
      formats.set(['time.year.singular',    'time.year.plural'],    TimeConstants.year);
      formats.set([''],                                             Number.MAX_SAFE_INTEGER);

      let diffInSeconds = (+new Date() - time) / 1000;

      let prevKey: string[] | null = null;
      let prevValue: number  | null = null;

      for(let key of formats.keys()) {
        const value = formats.get(key)!;

        if(diffInSeconds < value && !!prevKey && !!prevValue){
          const count = Math.round(diffInSeconds / prevValue);
          const unityKey = count < 2 ? prevKey[0] : `${prevKey[1]}`;

          return `${count.toFixed()} ${this.translatePipe.transform(unityKey)}`;
        }

        prevKey = key;
        prevValue = value;
      }
    }

    return '';
  }
}
