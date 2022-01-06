import { Activity } from './../strava/activity.d';

export class Run {

  //TODO MAP

  public constructor(activity: Activity) {
    this.stravaId = activity.id;

    this.name = activity.name;

    this.distance = activity.distance;
    this.elevation = activity.total_elevation_gain;

    this.startTime = new Date(activity.start_date);
    this.movingtime = activity.moving_time;
    this.endtime = new Date(this.startTime.getTime() + (this.movingtime * 1000));

    this.kudos_count = activity.kudos_count;
    this.comment_count = activity.comment_count;
    this.photo_count = activity.photo_count;

    this.average_speed = activity.average_speed;
    this.max_speed = activity.max_speed;
  }

  public stravaId: number;

  public name: string;

  // Distance (m)
  public distance: number;
  public elevation: number;

  // Time (s)
  public startTime: Date;
  public movingtime: number; // s
  public endtime: Date;

  // Social
  public kudos_count: number;
  public comment_count: number;
  public photo_count: number;

  // Speed (m/s)
  public average_speed: number;
  public max_speed: number | null;
}
