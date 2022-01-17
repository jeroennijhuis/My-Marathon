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

  /// FEATURE
  // HEADER
  //  - METRICS SWITCH
  //  - (?) REMOVE INVALID DATA INSTRUCTIONS

  /// BUG
  // MOVING BACKGROUND MOBILE
}
