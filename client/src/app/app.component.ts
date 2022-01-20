import { Component } from '@angular/core';
import { LanguageService } from './services/language/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public constructor(languageService: LanguageService) {
    languageService.setup();
}
  // BACKLOG

  /// TECHNICAL
  // DOCKER SETUP
  // PIPELINE
  // CORS SETUP API GATEWAY
  // Lint
  // CACHE RUNS IN BACKEND
  // CHECK FOR RESPONSE HEADERS
  //  - X-Ratelimit-Limit: 600,30000
  //  - X-Ratelimit-Usage: 314,27536
  // Use Refresh tokens when access token has expired
  // Register webhooks for processing new activities

  /// FEATURE
  // Get stats 'https://www.strava.com/api/v3/athletes/{athlete_id}/stats'
  // HEADER
  //  - (?) REMOVE INVALID DATA INSTRUCTIONS

  /// BUG
  // MOVING BACKGROUND MOBILE
  // LOADING DEMO STUCK
}
