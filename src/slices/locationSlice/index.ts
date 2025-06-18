import {
  API_KEY,
  BASE_URL,
  RequestState,
  type CitySuggestion,
} from "@configs/types";
import { enqueueSnackbar } from "notistack";
import axios, { HttpStatusCode } from "axios";
import { getErrorMessage } from "@configs/utils";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface LocationState {
  locationSuggestion: CitySuggestion;
  state: RequestState;
  error: string | null;
}

const initialState: LocationState = {
  locationSuggestion: {} as CitySuggestion,
  state: RequestState.IDLE,
  error: null,
};

export const fetchLocation = createAsyncThunk(
  "location/fetchLocation",
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
      const response = await axios.get(`${BASE_URL}/search.json`, {
        params: { q: location, key: API_KEY },
      });

      if (response.status === HttpStatusCode.Ok) {
        return response.data;
      } else {
        throw new Error(
          response.data?.error?.message || "Unexpected error fetching location."
        );
      }
    } catch (error) {
      const errorMessage = getErrorMessage(
        error,
        "Failed to fetch location data."
      );
      enqueueSnackbar(errorMessage, { variant: "error" });

      return rejectWithValue(errorMessage);
    }
  }
);

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocation.pending, (state) => {
        state.state = RequestState.LOADING;
        state.error = null;
      })
      .addCase(fetchLocation.fulfilled, (state, action) => {
        state.locationSuggestion = action.payload;
        state.state = RequestState.SUCCEEDED;
      })
      .addCase(fetchLocation.rejected, (state, action) => {
        state.state = RequestState.FAILED;
        state.error = action.error.message || "Failed to fetch location";
      });
  },
});

export default locationSlice.reducer;
