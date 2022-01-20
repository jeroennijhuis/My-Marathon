import { Component, Input, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language/language.service';
import { Language } from 'src/app/services/language/models/language';
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

  public constructor(private languageService: LanguageService) {
  }

  public get currentLanguage(): Language{
    return this.languageService.getCurrentLanguage();
  }

  public distanceType = DistanceType;

  public getDistanceType(run: Run): DistanceType{
    return getDistanceType(run.distance);
  }
}
