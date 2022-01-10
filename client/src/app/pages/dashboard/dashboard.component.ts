import { Component, Input, OnInit } from '@angular/core';
import { faMountain, faRoad, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { Run } from 'src/app/services/strava/models/custom/run';
import { StravaService } from 'src/app/services/strava/strava.service';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent  {

  private _runs: Run[] = [];


  @Input()
  public set runs(value: Run[]){
    this._runs = value;
    this.recentRuns = value.sort((a, b) => b.startTime.getTime() - a.startTime.getTime()).slice(0, 14);

    this.totalElevation = value.reduce((sum, current) => sum + current.elevation, 0);
    this.mostElevationRun = value.sort((a, b) => b.elevation - a.elevation)[0];

    this.totalDistance = value.reduce((sum, current) => sum + current.distance, 0);
    this.mostDistanceRun = value.sort((a, b) => b.distance - a.distance)[0];

    this.totalKudos = value.reduce((sum, current) => sum + current.kudos_count, 0);
    this.mostKudosRun = value.sort((a, b) => b.kudos_count - a.kudos_count)[0];

    // Chart
    let months=["January","February","March","April","June", "July", "August", "September", "October", "November", "December"];
    let currentMonth=new Date().getMonth();
    this.barChartLabels = months.slice(currentMonth-7).concat(months.slice(0,currentMonth + 1));

    var d = new Date();
    d.setMonth(d.getMonth() - 7);
    const beginDate = new Date(d.getFullYear(), d.getMonth());

    for (let i = 0; i <= 7 ; i++) {
      const tempBeginDate = new Date(beginDate.getTime());
      tempBeginDate.setMonth(beginDate.getMonth() + i);
      const tempEndDate = new Date(beginDate.getTime());
      tempEndDate.setMonth(beginDate.getMonth() + i + 1);

      const totalDistance = value.filter(x => x.startTime.getTime() >= tempBeginDate.getTime() && x.startTime.getTime() < tempEndDate.getTime()).reduce((sum, current) => sum + current.distance / 1000, 0);
      this.barChartData[0].data.push(totalDistance);
    }
  }

  public get runs(): Run[]{
    return this._runs;
  }

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

  public recentRuns: Run[] = [];

  // chart
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: any[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartPlugins = [];
  public chartColors: any[] = [
    {
      backgroundColor:["#FF7360", "#6FC8CE", "#FAFFF2", "#FFFCC4", "#B9E8E0"]
    }];

  public barChartData: ChartDataset[] = [
    { data: [] }
  ];

  public constructor(stravaService: StravaService) {
    stravaService.getRuns().subscribe(runs => {
      this.runs = this.runs.concat(runs);
    });
  }
}
