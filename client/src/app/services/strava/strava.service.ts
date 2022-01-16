import { DemoService } from 'src/app/services/demo/demo.service';
import { Run } from 'src/app/services/strava/models/custom/run';
import { ActivityType } from './models/strava/activity-type';
import { Activity } from './models/strava/activity.d';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, defer, of, mergeMap, EMPTY, concat, expand, tap, Subject, delay
} from 'rxjs';
import { Page } from './Page';

@Injectable({
    providedIn: 'root',
})
export class StravaService {

    private readonly maxPageSize: number = 200;

    public readonly activities$: Subject<Page<Activity>> = new Subject();
    public readonly runs$: Observable<Page<Run>>;

    public constructor(private httpClient: HttpClient, private demoService: DemoService)
    {
      this.runs$ = this.demoService.isEnabled
        ? this.demoService.getRuns()
        : this.activities$.pipe(
          map(page => new Page<Run>(page.pageNumber, page.value.filter(x => x.type === ActivityType.Run).map(a => new Run(a)), page.isCompleted))
        );
     }

     public loadAllActivities(): Observable<any> {
       if(this.demoService.isEnabled){
        return of({}).pipe(delay(1000));
       }
       else {
        return this.getActivities();
       }
     }

     public loadNewActivities(after: number): Observable<any> {
      if(this.demoService.isEnabled){
        return of({}).pipe(delay(1000));
       }
       else {
        return this.httpClient.get<Activity[]>(`https://www.strava.com/api/v3/athlete/activities?after=${after}`).pipe(
          map((x: Activity[]) => new Page<Activity>(1, x, true)),
          tap(page => this.activities$.next(page))
        )
       }
    }

    private getActivities(): Observable<Page<Activity>> {
      return this.fetchActivties().pipe(
        expand((page: Page<Activity>, _i: Number) => page.value?.length >= (this.maxPageSize - 1)
          ? this.fetchActivties(page.pageNumber + 1)
          : EMPTY
        ),
        tap(acitivtyPage => this.activities$.next(acitivtyPage))
      );
    }

    private fetchActivties(page: number = 1): Observable<Page<Activity>> {
      return this.httpClient.get<Activity[]>(`https://www.strava.com/api/v3/athlete/activities?per_page=${this.maxPageSize}&page=${page}`)
      .pipe(
        map((x: Activity[]) => new Page<Activity>(page, x, x.length < (this.maxPageSize - 1))),
        catchError(err => {
          throw err;
        })
      );
    }
}
