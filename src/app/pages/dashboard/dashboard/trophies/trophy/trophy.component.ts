import { Component, Input, OnInit } from '@angular/core';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
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

    this.mostRecentRun = value.sort((a, b) => b.start_date_local.getTime() - a.start_date_local.getTime())[0];

    const sum = value.map(r => r.average_speed).reduce((a, b) => a + b, 0);
    this.avgSpeed = (sum / value.length) || 0;
  }
  public get runs(): Run[] {
    return this._runs;
  }

  public distanceTypeEnum = DistanceType;

  public mostRecentRun: Run | undefined;
  public avgSpeed: number | undefined;
  public title: string = '';

  public icon = faTrophy;
}
