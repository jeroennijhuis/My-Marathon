import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public isLoading: boolean = false;

  public constructor(tokenService: TokenService, private authService: AuthService, router: Router, route: ActivatedRoute) {
    if(!!tokenService.getToken()){
      router.navigate([`/`]);
    }

    const code: string = route.snapshot.queryParams['code'];
    if(!!code)
    {
      this.isLoading = true;
      const state: string = route.snapshot.queryParams['state'];
      const scope: string = route.snapshot.queryParams['scope'];

      this.authService.getAccessToken(code).subscribe(_ => router.navigate([`/dashboard`]));
    }
  }

  public login(): void {
    this.authService.getAuthorizationCode();
  }
}
