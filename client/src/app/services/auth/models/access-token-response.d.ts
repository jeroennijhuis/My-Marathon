import { Athlete } from "../../strava/models/strava/athlete";

export interface AccessTokenResponse {
  access_token: string;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  token_type: string;
  athlete: Athlete;
}
