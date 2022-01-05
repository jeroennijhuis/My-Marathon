import { TrophiesComponent } from './pages/dashboard/dashboard/trophies/trophies.component';
import { DateTimeDiffPipe } from './pipes/date-time-diff.pipe';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login/login.component';
import { AuthService } from './services/auth/auth.service';
import { StravaService } from './services/strava/strava.service';
import { TokenService } from './services/token/token.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TrophyComponent } from './pages/dashboard/dashboard/trophies/trophy/trophy.component';
import { TimePipe } from './pipes/time.pipe';
import { SpeedPipe } from './pipes/speed.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    TrophiesComponent,
    TrophyComponent,
    DateTimeDiffPipe,
    TimePipe,
    SpeedPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [
    AuthService,
    TokenService,
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
