import { DistanceType } from "../services/strava/models/custom/enum/distance-type";

export const getDistanceType = (distance: number): DistanceType => {
  if(distance >= 42_195) return DistanceType.Marathon;
  if(distance >= 21_097) return DistanceType.SemiMarathon;
  if(distance >= 10_000) return DistanceType.TenKilometer;
  if(distance >= 5_000) return DistanceType.FiveKilometer;

  return DistanceType.None;
}
