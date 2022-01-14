import { catchError } from 'rxjs/operators';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faRoad, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DemoService } from 'src/app/services/demo/demo.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public isLoading: boolean = false;

  public stravaIcon: IconDefinition = faRoad;

  public constructor(tokenService: TokenService, private demoService: DemoService, private authService: AuthService, private router: Router, route: ActivatedRoute) {
    if(!!tokenService.getAccessToken()){
      router.navigate([`/`]);
    }

    const code: string = route.snapshot.queryParams['code'];
    const scope: string = route.snapshot.queryParams['scope'];

    if(!!code && !!scope && this.authService.validateScope(scope))
    {
      this.authService.getAccessToken(code)
        .subscribe(_ => this.goToDashboard());
    }
  }

  public login(): void {
    this.authService.getAuthorizationCode();
  }

  public showDemo(): void{
    this.demoService.enable();
    this.goToDashboard();
  }

  public goToDashboard(): void {
    this.router.navigate([`/dashboard`]);
  }
}
