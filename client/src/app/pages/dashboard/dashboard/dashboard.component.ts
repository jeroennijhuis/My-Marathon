import { timeout } from 'rxjs';
import { Run } from './../../../services/strava/models/custom/run';
import { Component } from '@angular/core';
import { StravaService } from 'src/app/services/strava/strava.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  public runs: Run[] = [];
  public totalDistance: number | null = null;
  public totalRuns: number | null = null;
  public totalKudos: number | null = null;
  public totalTimeSpent: number | null = null;

  public constructor(stravaService: StravaService) {
    stravaService.getRuns().subscribe(runs => {
      this.runs = this.runs.concat(runs);
      this.totalRuns = runs.length;
      this.totalDistance = runs.reduce((sum, current) => sum + (current.distance ?? 0), 0);
      this.totalKudos = runs.reduce((sum, current) => sum + (current.kudos_count ?? 0), 0);
      this.totalTimeSpent = runs.reduce((sum, current) => sum + (current.movingtime ?? 0), 0);
    });
  }
}
