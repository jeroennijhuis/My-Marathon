import { DecimalPipe, formatNumber } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { DistanceConstants } from '../constants/distance.contstants';

@Pipe({
  name: 'speed'
})
export class SpeedPipe implements PipeTransform {

  constructor(private decimalPipe: DecimalPipe) {
  }

  transform(speed: any, _args?: any): any {
    switch (typeof speed) {
      case 'number':
          break;
      default:
          return '';
    }

    const minPerKm = 16.6666667 / speed;

    const minutes = Math.floor(minPerKm);
    const seconds = Math.floor((minPerKm - minutes) * 60);

    return `${minutes}:${this.decimalPipe.transform(seconds, '2.0')} min/km`;
  }
}
