import { Component, Input, OnInit } from '@angular/core';
import { DistanceType } from 'src/app/services/strava/models/custom/enum/distance-type';
import { Run } from 'src/app/services/strava/models/custom/run';
import { getDistanceType } from 'src/app/utils/distance.util';

@Component({
  selector: 'app-activity-timeline',
  templateUrl: './activity-timeline.component.html',
  styleUrls: ['./activity-timeline.component.scss']
})
export class ActivityTimelineComponent {
  @Input() public title: string | undefined;
  @Input() public runs: Run[] = [];


  public distanceType = DistanceType;

  public getDistanceType(run: Run): DistanceType{
    return getDistanceType(run.distance);
  }
}
