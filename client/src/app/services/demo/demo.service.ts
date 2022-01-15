import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of } from 'rxjs';
import { Run } from '../strava/models/custom/run';
import { Activity } from '../strava/models/strava/activity';
import { ActivityType } from '../strava/models/strava/activity-type';
import { Page } from '../strava/Page';

@Injectable({
  providedIn: 'root'
})
export class DemoService {

  private readonly DEMO_MODE_ENABLED = 'demo_mode_enabled';
  private readonly enabledValue: string = 'true';

  isEnabled(): boolean {
    const value = sessionStorage.getItem(this.DEMO_MODE_ENABLED);
    return !!value && value === this.enabledValue;
  }

  enable(): void {
    return sessionStorage.setItem(this.DEMO_MODE_ENABLED, this.enabledValue);
  }

  disable(): void {
    sessionStorage.removeItem(this.DEMO_MODE_ENABLED);
  }

  public getRuns(): Observable<Page<Run>>{
    const items = Array.from(Array(100).keys())

    const random: Activity[] = items.map((_v: any, index: number) => {
      const currentDate = new Date();
      const speed = this.getRandom(2, 4);
      const distance = this.getRandom(2000,24000);
      const timeInSeconds = distance / speed;
      const elevation = this.getRandom(0,30);

      return {
        average_speed: speed,
        comment_count: this.getRandom(0, 5),
        distance: distance,
        id: 0,
        kudos_count: this.getRandom(0, 20),
        max_speed: speed,
        moving_time: timeInSeconds,
        elapsed_time: timeInSeconds,
        name: `RUN #${index.toString()} (DEMO DATA)`,
        photo_count: 0,
        total_elevation_gain: elevation,
        elev_low: elevation,
        elev_high: elevation,
        achievement_count: this.getRandom(0,3),
        athlete: undefined,
        athlete_count: 0,
        commute: false,
        external_id: undefined,
        flagged: false,
        gear_id: null,
        has_kudoed: false,
        hide_from_home: false,
        manual: false,
        private: false,
        timezone: '',
        type: ActivityType.Run,
        upload_id: undefined,
        upload_id_str: undefined,
        workout_type: undefined,
        trainer: undefined,
        total_photo_count: 0,
        start_date_local: '',
        start_date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDay() - (index*2)).getTime()
      } as Activity;
    });

    return of(random).pipe(
      map(x =>
        x.filter(x => x.type === ActivityType.Run)
        .map(a => new Run(a))),
        catchError(err => {
          throw err;
        }
      ),
      map(x => new Page<Run>(0, x, true))
    );
  }

  private getRandom(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
