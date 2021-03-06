import { ActivityType } from "./activity-type";

export interface Activity {

  // The unique identifier of the activity
  id: number;

  // The identifier provided at upload time
  external_id?: string | null;

  // The identifier of the upload that resulted in this activity
  upload_id?: number | null;

  // The name of the activity
  name: string;

  // The activity's distance, in meters
  distance: number;

  // The activity's moving time, in seconds
  moving_time: number;

  // The activity's elapsed time, in seconds
  elapsed_time?: number | null;

  // The activity's total elevation gain.
  total_elevation_gain: number;

  // The activity's highest elevation, in meters
  elev_high?: number | null;

  // The activity's lowest elevation, in meters
  elev_low?: number | null;

  // An instance of ActivityType
  type?: ActivityType | null;

  // The time at which the activity was started.
    start_date: number;

  // The time at which the activity was started in the local timezone.
  start_date_local: string;

  // The timezone of the activity
  timezone?: string | null;

  // An instance of LatLng.
  // TODO start_latlng?:

  // An instance of LatLng.
  // TODO end_latlng?:

  // The number of achievements gained during this activity
  achievement_count?: number | null;

  // The number of kudos given for this activity
  kudos_count: number;

  // The number of kudos given for this activity
  comment_count: number;

  // The number of athletes for taking part in a group activity
  athlete_count?: number | null;

  // The number of Instagram photos for this activity
  photo_count: number;

  // The number of Instagram and Strava photos for this activity
  total_photo_count?: number | null;

  // An instance of PolylineMap.
  // TODO map

  // Whether this activity was recorded on a training machine
  trainer?: boolean | null;

  // Whether this activity is a commute
  commute?: boolean | null;

  // Whether this activity was created manually
  manual?: boolean | null;

  // Whether this activity is private
  private?: boolean | null;

  // Whether this activity is flagged
  flagged?: boolean | null;

  // The activity's workout type
  workout_type?: number | null;

  // The unique identifier of the upload in string format
  upload_id_str?: string | null;

  // The activity's average speed, in meters per second
  average_speed: number;

  // The activity's max speed, in meters per second
  max_speed: number;

  // Whether the logged-in athlete has kudoed this activity
  has_kudoed?: boolean | null;

  // Whether the activity is muted
  hide_from_home?: boolean | null;

  // The id of the gear for the activity
  gear_id?: string | null;
}
