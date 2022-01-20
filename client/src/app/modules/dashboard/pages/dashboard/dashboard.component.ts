import { TranslatePipe } from '@ngx-translate/core';
import { Language } from './../../../../services/language/models/language';
import { Component, Input, OnDestroy } from '@angular/core';
import { faClock, faCommentAlt, faMountain, faRoad, faRunning, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { ChartConfiguration, ChartDataset, ChartOptions } from 'chart.js';
import { Run } from 'src/app/services/strava/models/custom/run';
import { StravaService } from 'src/app/services/strava/strava.service';
import { trigger, style, animate, transition} from '@angular/animations';
import { Page } from 'src/app/services/strava/Page';
import { LanguageService } from 'src/app/services/language/language.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('isLoaded', [
      transition(
        ':enter',
        [
          style({ opacity: 0 }),
          animate('1s ease-in',
                  style({ opacity: 1 }))
        ]
      ),
      transition(
        ':leave',
        [
          style({ opacity: 1 }),
          animate('1s ease-out',
                  style({ opacity: 0 }))
        ]
      )
    ])
  ]
})
export class DashboardComponent implements OnDestroy  {

  private _runs: Run[] = [];
  private _monthKeys: string[] = [];
  private _destroy$ = new Subject<void>();

  @Input()
  public set runs(value: Run[]){
    this._runs = value;
    this.updateRuns(value);
  }

  public get runs(): Run[]{
    return this._runs;
  }

  public isLoaded = false;

  // Distance
  public roadIcon = faRoad;
  public totalDistance: number = 0;
  public mostDistanceRun: Run | undefined;

  // Elevation
  public mountainIcon = faMountain;
  public totalElevation: number = 0;
  public mostElevationRun: Run | undefined;

  // Kudos
  public thumbsUpIcon = faThumbsUp;
  public totalKudos: number = 0;
  public mostKudosRun: Run | undefined;

  // Pace
  public fastestPaceIcon = faRunning;
  public fastestPace: number = 0;
  public fastestPaceRun: Run | undefined;

  // Time
  public timeSpentIcon = faClock;
  public totalTimeSpent: number = 0;
  public longestRun: Run | undefined;

   // Comments
   public commentsIcon = faCommentAlt;
   public totalComments: number = 0;
   public mostCommentsRun: Run | undefined;

  public recentRuns: Run[] = [];

  // Bar Chart
  public barChartOptions: ChartOptions = {
    responsive: true,
  };

  public barChartLabels: any[] = [];
  public chartColors: any[] = [
    {
      backgroundColor:["#FF7360", "#6FC8CE", "#FAFFF2", "#FFFCC4", "#B9E8E0"]
    }];

  public barChartData: ChartDataset[] = [
    {
      data: [],
      hoverBackgroundColor: '#012970',
      backgroundColor: '#949fb1',
      borderColor: '#949fb1',
    }
  ];

  // Line Chart
  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      'y-axis-0':
      {
        position: 'right'
      }
    }
  };

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        hoverBackgroundColor: '#012970',
        backgroundColor: '#949fb1',
        borderColor: '#949fb1',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
        spanGaps: true
      }
    ],
    labels: []
  };

  public constructor(stravaService: StravaService, private languageService: LanguageService, private translatePipe: TranslatePipe) {
    stravaService.runs$.subscribe((page: Page<Run>) => {
      this.runs = this.runs.concat(page.value);
      if(page.isCompleted){
        this.isLoaded = true;
      }

      languageService.onLangChange.pipe(takeUntil(this._destroy$)).subscribe(_ => this.setupChartLabels());
    });

    stravaService.loadAllActivities().subscribe();
  }

  public get currentLanguage(): Language
  {
    return this.languageService.getCurrentLanguage();
  }

  private updateRuns(runs: Run[]): void {
    this.recentRuns = runs.sort((a, b) => b.startTime.getTime() - a.startTime.getTime()).slice(0, 11);

    this.totalElevation = runs.reduce((sum, current) => sum + current.elevation, 0);
    this.mostElevationRun = runs.sort((a, b) => b.elevation - a.elevation)[0];

    this.totalDistance = runs.reduce((sum, current) => sum + current.distance, 0);
    this.mostDistanceRun = runs.sort((a, b) => b.distance - a.distance)[0];

    this.totalKudos = runs.reduce((sum, current) => sum + current.kudos_count, 0);
    this.mostKudosRun = runs.sort((a, b) => b.kudos_count - a.kudos_count)[0];

    this.fastestPaceRun = runs.sort((a, b) => b.max_speed - a.max_speed)[0];
    this.fastestPace = this.fastestPaceRun.max_speed;

    this.fastestPaceRun = runs.sort((a, b) => b.max_speed - a.max_speed)[0];
    this.fastestPace = this.fastestPaceRun.max_speed;

    this.totalTimeSpent = runs.reduce((sum, current) => sum + current.movingtime, 0);
    this.longestRun = runs.sort((a, b) => b.movingtime - a.movingtime)[0];

    this.mostCommentsRun = runs.sort((a, b) => b.comment_count - a.comment_count)[0];
    this.totalComments = runs.reduce((sum, current) => sum + current.comment_count, 0);

    // Charts
    const months =["month.january","month.february","month.march","month.april","month.june", "month.july", "month.august", "month.september", "month.october", "month.november", "month.december"];
    let currentMonth=new Date().getMonth();
    this._monthKeys = months.slice(currentMonth-7).concat(months.slice(0,currentMonth + 1));
    this.setupChartLabels();

    var d = new Date();
    d.setMonth(d.getMonth() - 7);
    const beginDate = new Date(d.getFullYear(), d.getMonth());

    for (let i = 0; i <= 7 ; i++) {
      const tempBeginDate = new Date(beginDate.getTime());
      tempBeginDate.setMonth(beginDate.getMonth() + i);
      const tempEndDate = new Date(beginDate.getTime());
      tempEndDate.setMonth(beginDate.getMonth() + i + 1);

      const scopedRuns = runs.filter(x => x.startTime.getTime() >= tempBeginDate.getTime() && x.startTime.getTime() < tempEndDate.getTime());
      const totalDistance = scopedRuns.reduce((sum, current) => sum + current.distance / 1000, 0);
      const avgPace = scopedRuns.reduce((sum, current) => sum + current.average_speed, 0) / scopedRuns.length;
      this.barChartData[0].data.push(totalDistance);
      this.lineChartData.datasets[0].data.push(16.6666667 / avgPace);
    }
  }

  private setupChartLabels(): void {
    const labels = this._monthKeys.map(x => this.translatePipe.transform(x));

    this.barChartLabels = labels;
    this.lineChartData = {...this.lineChartData, labels};
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
