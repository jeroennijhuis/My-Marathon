import { AccessTokenResponse } from './models/access-token-response.d';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private static readonly CLIENT_ID = '75268';
  private static readonly API_BASE_URL = 'https://www.strava.com';
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

    return this.httpClient.post<AccessTokenResponse>(`https://age8n250gl.execute-api.eu-west-1.amazonaws.com/Development/StravaApi`, { code })
    .pipe(
      tap(response => {
        this.tokenService.saveToken(response.access_token);
        this.tokenService.saveRefreshToken(response.refresh_token);
      })
    );
  }
}
