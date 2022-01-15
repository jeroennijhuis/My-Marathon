import { Component, Input } from '@angular/core';
import { DistanceType } from 'src/app/services/strava/models/custom/enum/distance-type';
import { Run } from 'src/app/services/strava/models/custom/run';
import { getDistanceType } from 'src/app/utils/distance.util';

@Component({
  selector: 'app-trophies',
  templateUrl: './trophies.component.html',
  styleUrls: ['./trophies.component.scss']
})
export class TrophiesComponent {

  @Input()
  public set runs(runs: Run[]){
    this.marathonRuns = runs.filter(x => getDistanceType(x.distance ?? 0) === DistanceType.Marathon);
    this.semiMarathonRuns = runs.filter(x => getDistanceType(x.distance ?? 0) === DistanceType.SemiMarathon);
    this.tenKilometerRuns = runs.filter(x => getDistanceType(x.distance ?? 0) === DistanceType.TenKilometer);
    this.fiveKilometerRuns = runs.filter(x => getDistanceType(x.distance ?? 0) === DistanceType.FiveKilometer);
  }

  public marathonRuns: Run[] = [];
  public semiMarathonRuns: Run[] = [];
  public tenKilometerRuns: Run[] = [];
  public fiveKilometerRuns: Run[] = [];

  public distanceType = DistanceType;
}
