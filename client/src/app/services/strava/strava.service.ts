import { Run } from 'src/app/services/strava/models/custom/run';
import { ActivityType } from './models/strava/activity-type';
import { Activity } from './models/strava/activity.d';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, defer, of, mergeMap, EMPTY, concat, expand, tap
} from 'rxjs';
import { Page } from './Page';

@Injectable({
    providedIn: 'root',
})
export class StravaService {

    private readonly maxPageSize: number = 200;

    public constructor(private httpClient: HttpClient) { }

    public getRuns(page: number = 1): Observable<Page<Run>> {
      return this.fetchActivties(page).pipe(
        expand((page: Page<Activity>, _i: Number) => page.value?.length >= (this.maxPageSize - 1)
          ? this.fetchActivties(page.pageNumber + 1)
          : EMPTY
        ),
        map(page => new Page<Run>(page.pageNumber, page.value.filter(x => x.type === ActivityType.Run).map(a => new Run(a)), page.isCompleted))
      );
    }

    private fetchActivties(page: number): Observable<Page<Activity>> {
      return this.httpClient.get<Activity[]>(`https://www.strava.com/api/v3/athlete/activities?per_page=${this.maxPageSize}&page=${page}`)
      .pipe(
        map((x: Activity[]) => new Page<Activity>(page, x, x.length < (this.maxPageSize - 1))),
        catchError(err => {
          throw err;
        })
      );
    }
}
