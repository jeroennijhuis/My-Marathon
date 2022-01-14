import { AccessTokenResponse } from './models/access-token-response.d';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, reduce, tap, throwError } from 'rxjs';
import { TokenService } from '../token/token.service';
import { error } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private static readonly CLIENT_ID = '75268';
  private static readonly API_BASE_URL = 'https://www.strava.com';
  // public static REDIRECT_URL = 'https://running.jnijhuis.nl/login';
  public static readonly REDIRECT_URL = 'http://localhost:4200/login';
  public static readonly REQUIRED_SCOPES: string[] = ['activity:read'];
  public static readonly SCOPE_SEPERATOR: string = ',';

  public constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService)
  {  }

  public getAuthorizationCode(): void {
    this.tokenService.removeAccessToken();

    let params = new HttpParams()
      .set('client_id', AuthService.CLIENT_ID)
      .set('redirect_uri', AuthService.REDIRECT_URL)
      .set('response_type', 'code')
      .set('approval_prompt', 'auto')
      .set('scope', AuthService.REQUIRED_SCOPES.join(AuthService.SCOPE_SEPERATOR));

    window.location.href = `${AuthService.API_BASE_URL}/oauth/authorize?${params.toString()}`;
  }

  public getAccessToken(code: string): Observable<AccessTokenResponse> {

    return this.httpClient.post<AccessTokenResponse>(`https://age8n250gl.execute-api.eu-west-1.amazonaws.com/Development/StravaApi`, { code })
    .pipe(
      tap(response => {
        this.tokenService.saveAccessToken(response.access_token);
      })
    );
  }

  public validateScope(scope: string): boolean {
    const scopes = scope.split(AuthService.SCOPE_SEPERATOR);
    return AuthService.REQUIRED_SCOPES.every(requiredScope => scopes.some(scope => requiredScope === scope));
  }
}
