import { Component, Input, OnInit } from '@angular/core';
import { faCalendarAlt, faRunning, faTachometerAlt, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { DistanceType } from 'src/app/services/strava/models/custom/enum/distance-type';
import { Run } from 'src/app/services/strava/models/custom/run';

@Component({
  selector: 'app-trophy',
  templateUrl: './trophy.component.html',
  styleUrls: ['./trophy.component.scss']
})
export class TrophyComponent {

  private _distanceType: DistanceType | undefined;
  private _runs: Run[] = [];

  @Input()
  public set distanceType(value: DistanceType | undefined) {
    this._distanceType = value;

    switch(value){
      case DistanceType.Marathon:
        this.title = 'Marathon';
        break;

      case DistanceType.SemiMarathon:
        this.title = '½ Marathon';
        break;

      case DistanceType.TenKilometer:
        this.title = '10 Kilometer';
        break;

      case DistanceType.FiveKilometer:
        this.title = '5 Kilometer';
        break;
    }
  }

  public get distanceType(): DistanceType | undefined {
    return this._distanceType;
  }

  @Input() public set runs(value: Run[]) {
    this._runs = value;

    this.fastestRun = value.sort((a, b) => b.average_speed- a.average_speed)[0];
  }
  public get runs(): Run[] {
    return this._runs;
  }

  public distanceTypeEnum = DistanceType;

  public fastestRun: Run | undefined;
  public title: string = '';

  public trophyIcon = faTrophy;
  public speedIcon = faTachometerAlt;
}
