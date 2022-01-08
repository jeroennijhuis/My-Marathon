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

  public constructor(stravaService: StravaService) {
    stravaService.getRuns().subscribe(runs => {
      this.runs = this.runs.concat(runs);
    });
  }
}
