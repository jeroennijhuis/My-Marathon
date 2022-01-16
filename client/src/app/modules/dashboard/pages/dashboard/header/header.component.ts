import { StravaService } from './../../../../../services/strava/strava.service';
import { Component, OnInit } from '@angular/core';
import { faArrowCircleUp, faFlag, faSync, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Athlete } from 'src/app/services/auth/models/athlete';
import { Run } from 'src/app/services/strava/models/custom/run';
import { DemoService } from 'src/app/services/demo/demo.service';
import { delay } from 'rxjs';
import { Page } from 'src/app/services/strava/Page';
import { DistanceType } from 'src/app/services/strava/models/custom/enum/distance-type';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('isRefreshing', [
      state('true' , style({ transform: 'rotate(1800deg)' })),
      state('false', style({ transform: 'rotate(0)'  })),
      transition('1 => 0', animate('0s')),
      transition('0 => 1', animate('10s'))
    ])
  ]
})
export class HeaderComponent {

  public trophyIcon = faTrophy;
  public refreshIcon = faSync;
  public flagIcon = faFlag;
  public distanceTypeEnum = DistanceType;

  public isLoading: boolean = false;
  public isRefreshing: boolean = false;
  public isRefreshDisabled: boolean = false;

  public athlete: Athlete | null;

  private _runs: Run[] = [];

  public newTrophyRuns: Run[] = [];

  public constructor(private authService: AuthService, private stravaService: StravaService, private translateService: TranslateService) {
    this.athlete = authService.getAthlete();

    this.isLoading = true;
    stravaService.runs$.subscribe((page: Page<Run>) => {
      this._runs = this._runs.concat(page.value);

      const date = new Date();
      const weekAgo = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7);
      if(page.isCompleted){
        this.newTrophyRuns = this._runs.filter(r => r.distanceType !== DistanceType.None && r.startTime.getTime() > weekAgo.getTime()).slice(0,4);
      }

      this.isLoading = false;
    });
  }

  public refresh(): void {
    const latest = this._runs.reduce((latest, r) => Math.max(latest, r.startTime.getTime() / 1000), 0);
    this.isRefreshing = true;
    this.isRefreshDisabled = true;
    this.stravaService.loadNewActivities(latest).subscribe(_ =>
       {
        setTimeout(() => this.isRefreshing = false, 800);
         setTimeout(() => this.isRefreshDisabled = false, 5000);
      });
  }

  public switchLanguage(lang: string): void {
    this.translateService.use(lang);
  }

  public signOut(): void {
    this.authService.signOut();
  }
}
