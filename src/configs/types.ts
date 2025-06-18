export const BASE_URL = "https://api.weatherapi.com/v1";

export const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const UIMessages = {
  defaultError: "Something went wrong",
};

export enum RequestState {
  IDLE = "idle",
  LOADING = "loading",
  SUCCEEDED = "succeeded",
  FAILED = "failed",
}

export interface CitySuggestion {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
}

export const stormCodes = new Set([1087, 1273, 1276, 1279, 1282]);

export const rainCodes = new Set([
  1063, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201,
  1240, 1243, 1246, 1273, 1276,
]);

export const snowCodes = new Set([
  1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258, 1279, 1282,
]);

export const cloudCodes = new Set([1003, 1006, 1009]);

export const clearCodes = new Set([1000]);

export const mistCodes = new Set([1030, 1135, 1147]);

export const partlyCloudyCodes = new Set([1003]);

export interface WeatherResponse {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
  };
  current: {
    last_updated_epoch: number;
    last_updated: string;
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    windchill_c: number;
    windchill_f: number;
    heatindex_c: number;
    heatindex_f: number;
    dewpoint_c: number;
    dewpoint_f: number;
    vis_km: number;
    vis_miles: number;
    uv: number;
    gust_mph: number;
    gust_kph: number;
  };
}
