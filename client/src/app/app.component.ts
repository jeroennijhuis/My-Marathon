import { Component } from '@angular/core';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public constructor(translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

     // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
}
  // BACKLOG

  /// TECHNICAL
  // DOCKER SETUP
  // PIPELINE
  // CORS SETUP API GATEWAY
  // Lint

  /// FEATURE
  // HEADER
  //  - LANGUAGE SWITCH
  //  - METRICS SWITCH
  //  - (?) REMOVE INVALID DATA INSTRUCTIONS

  /// BUG
  // MOVING BACKGROUND MOBILE
}
