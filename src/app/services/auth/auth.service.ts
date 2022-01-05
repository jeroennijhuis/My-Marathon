import { AccessTokenResponse } from './models/access-token-response.d';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap, throwError } from 'rxjs';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // TODO MOVE CLIENT CREDS AND AUTHORIZATION TO LAMBDA
  // TODO ERROR HANDLING

  private static readonly CLIENT_ID = '75268';
  private static readonly CLIENT_SECRET = '';
  private static readonly API_BASE_URL = '';

  public static REDIRECT_URL = 'http://localhost:4200/login';

  public constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService)
  {  }

  public getAuthorizationCode(): void {
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();

    let params = new HttpParams()
      .set('client_id', AuthService.CLIENT_ID)
      .set('redirect_uri', AuthService.REDIRECT_URL)
      .set('response_type', 'code')
      .set('approval_prompt', 'auto')
      .set('scope', 'activity:read');

    window.location.href = `${AuthService.API_BASE_URL}/oauth/authorize?${params.toString()}`;
  }

  public getAccessToken(code: string): Observable<any> {

    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded');

    const body = new HttpParams()
      .append('client_id', AuthService.CLIENT_ID)
      .append('client_secret', AuthService.CLIENT_SECRET)
      .append('code', code)
      .append('grant_type', 'authorization_code');

    return this.httpClient.post<AccessTokenResponse>(`https://www.strava.com/api/v3/oauth/token`, body, { headers })
    .pipe(
      tap(response => {
        this.tokenService.saveToken(response.access_token);
        this.tokenService.saveRefreshToken(response.refresh_token);
      })
    );
  }
}
