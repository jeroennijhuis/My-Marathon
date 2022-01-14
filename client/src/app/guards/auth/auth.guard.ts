import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { DemoService } from 'src/app/services/demo/demo.service';
import { TokenService } from 'src/app/services/token/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  public constructor(private tokenService: TokenService, private demoService: DemoService, private router: Router) {
  }

  public canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot): boolean {
    return this.checkLogin();
  }

  public checkLogin(): boolean {
    if (!this.tokenService.getAccessToken() && !this.demoService.isEnabled()) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
