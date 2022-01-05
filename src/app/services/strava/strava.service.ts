import { Run } from './models/custom/run';
import { ActivityType } from './models/strava/activity-type';
import { Activity } from './models/strava/activity.d';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, catchError, throwError } from 'rxjs';
import activitiesMock from './../../../tmp/activities-data.json';

@Injectable({
    providedIn: 'root',
})
export class StravaService {
    public constructor(private httpClient: HttpClient) { }

    public getRuns(): Observable<Run[]> {

      const activities: Activity[] = activitiesMock as Activity[];
      return of(activities)
      .pipe(
        map(x =>
          x.filter(x => x.type === ActivityType.Run)
          .map(a => new Run(a))),
          catchError(err => {
            throw err;
          })
        )
      // this.httpClient.get<StravaActivity[]>('https://www.strava.com/api/v3/athlete/activities');
    }
}
