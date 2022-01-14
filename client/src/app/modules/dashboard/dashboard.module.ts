import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { TrophiesComponent } from './pages/dashboard/trophies/trophies.component';
import { TrophyComponent } from './pages/dashboard/trophies/trophy/trophy.component';
import { DateTimeDiffPipe } from 'src/app/pipes/date-time-diff.pipe';
import { TimePipe } from 'src/app/pipes/time.pipe';
import { SpeedPipe } from 'src/app/pipes/speed.pipe';
import { DashboardCardComponent } from './pages/dashboard/dashboard-card/dashboard-card.component';
import { ActivityTimelineComponent } from './pages/dashboard/activity-timeline/activity-timeline.component';
import { LoadingComponent } from 'src/app/components/loading/loading.component';
import { StravaService } from 'src/app/services/strava/strava.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'src/app/interceptors/auth.interceptor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgChartsModule
  ],
  declarations: [
    DashboardComponent,
    TrophiesComponent,
    TrophyComponent,
    DateTimeDiffPipe,
    TimePipe,
    SpeedPipe,
    DashboardCardComponent,
    ActivityTimelineComponent,
    DashboardCardComponent,
    LoadingComponent
  ],
  providers: [
    DecimalPipe,
    StravaService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class DashboardModule { }
