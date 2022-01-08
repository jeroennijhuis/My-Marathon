import { Run } from './models/custom/run';
import { ActivityType } from './models/strava/activity-type';
import { Activity } from './models/strava/activity.d';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, defer, of, mergeMap, EMPTY, concat} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class StravaService {

    private readonly maxPageSize: number = 200;

    public constructor(private httpClient: HttpClient) { }

    public getRuns(page: number = 1): Observable<Run[]> {
      return defer(() => this.fetchPage(page))
      .pipe(
        mergeMap((runs: Run[]) => {
          const items$ = of(runs);
          const next$ = runs?.length >= (this.maxPageSize - 1) ? this.getRuns(page + 1) : EMPTY;
          return concat(items$, next$);
        })
      )
    }

    private fetchPage(page: number): Observable<Run[]> {
      return this.httpClient.get<Activity[]>(`https://www.strava.com/api/v3/athlete/activities?per_page=${this.maxPageSize}&page=${page}`)
      .pipe(
        map(x =>
          x.filter(x => x.type === ActivityType.Run)
          .map(a => new Run(a))),
          catchError(err => {
            throw err;
          }
        )
      );
    }
}
