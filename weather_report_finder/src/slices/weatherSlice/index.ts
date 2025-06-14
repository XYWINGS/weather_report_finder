import { enqueueSnackbar } from "notistack";
import axios, { HttpStatusCode } from "axios";
import {
  API_KEY,
  BASE_URL,
  RequestState,
  type WeatherResponse,
} from "@configs/types";
import { getErrorMessage } from "@configs/utils";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface WeatherState {
  weatherData: WeatherResponse;
  state: RequestState;
  error: string | null;
}

const initialState: WeatherState = {
  weatherData: {} as WeatherResponse,
  state: RequestState.IDLE,
  error: null,
};

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (location: string, { rejectWithValue }) => {
    if (!API_KEY) {
      enqueueSnackbar("Weather API key is missing in environment variables.", {
        variant: "error",
      });
      return rejectWithValue(
        "Weather API key is missing in environment variables."
      );
    }

    try {
      const response = await axios.get(BASE_URL, {
        params: { q: location, key: API_KEY },
      });

      if (response.status === HttpStatusCode.Ok) {
        return response.data;
      } else {
        throw new Error(
          response.data?.error?.message || "Unexpected error fetching weather."
        );
      }
    } catch (error) {
      const errorMessage = getErrorMessage(
        error,
        "Failed to fetch weather data."
      );
      enqueueSnackbar(errorMessage, { variant: "error" });

      return rejectWithValue(errorMessage);
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.state = RequestState.LOADING;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.weatherData = action.payload;
        state.state = RequestState.SUCCEEDED;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.state = RequestState.FAILED;
        state.error = action.error.message || "Failed to fetch weather";
      });
  },
});

export default weatherSlice.reducer;
