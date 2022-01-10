import { TrophiesComponent } from './pages/dashboard/trophies/trophies.component';
import { DashboardCardComponent } from './pages/dashboard/dashboard-card/dashboard-card.component';
import { DateTimeDiffPipe } from './pipes/date-time-diff.pipe';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoginComponent } from './pages/login/login/login.component';
import { AuthService } from './services/auth/auth.service';
import { StravaService } from './services/strava/strava.service';
import { TokenService } from './services/token/token.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TimePipe } from './pipes/time.pipe';
import { SpeedPipe } from './pipes/speed.pipe';
import { DecimalPipe } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TrophyComponent } from './pages/dashboard/trophies/trophy/trophy.component';
import { ActivityTimelineComponent } from './pages/dashboard/activity-timeline/activity-timeline.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    TrophiesComponent,
    TrophyComponent,
    DateTimeDiffPipe,
    TimePipe,
    SpeedPipe,
    DashboardCardComponent,
    ActivityTimelineComponent,
    DashboardCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    NgChartsModule
  ],
  providers: [
    AuthService,
    TokenService,
    DecimalPipe,
    StravaService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
