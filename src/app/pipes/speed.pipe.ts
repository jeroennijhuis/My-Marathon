import { Pipe, PipeTransform } from '@angular/core';
import { DistanceConstants } from '../constants/distance.contstants';

@Pipe({
  name: 'speed'
})
export class SpeedPipe implements PipeTransform {

  transform(speed: any, _args?: any): any {
    switch (typeof speed) {
      case 'number':
          break;
      default:
          return '';
    }

    const kmh = speed /*m/s*/ * 3.6;

    return `${kmh.toFixed(1)} km/h`;
  }
}
