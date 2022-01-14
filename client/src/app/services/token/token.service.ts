import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly ACCESS_TOKEN = 'access_token';

  getAccessToken(): string | null {
    return sessionStorage.getItem(this.ACCESS_TOKEN);
  }

  saveAccessToken(token: string): void {
    sessionStorage.setItem(this.ACCESS_TOKEN, token);
  }

  removeAccessToken(): void {
    sessionStorage.removeItem(this.ACCESS_TOKEN);
  }
}
