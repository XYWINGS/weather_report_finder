import {
  Air,
  Cloud,
  Grain,
  Speed,
  Search,
  WbSunny,
  WbCloudy,
  LightMode,
  CloudQueue,
  Thermostat,
  LocationOn,
  Visibility,
  BeachAccess,
} from "@mui/icons-material";
import {
  Box,
  Card,
  Chip,
  Grid,
  Avatar,
  useTheme,
  TextField,
  Container,
  Typography,
  CardContent,
  Autocomplete,
  useMediaQuery,
  InputAdornment,
  LinearProgress,
  CircularProgress,
} from "@mui/material";
import { getUserLocation } from "@configs/utils";
import React, { useEffect, useState } from "react";
import { fetchWeather } from "@slices/weatherSlice";
import { fetchLocation } from "@slices/locationSlice";
import { useAppDispatch, useAppSelector } from "@slices/store";
import { WeatherStatusComponent } from "./WeatherStatusComponent";
import { RequestState, type CitySuggestion } from "@configs/types";
import { WeatherBackgroundAnimation } from "./components/WeatherBackgroundAnimation";

const WeatherApp: React.FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const weatherDataResponse = useAppSelector(
    (state) => state.weather.weatherData
  );
  const [open, setOpen] = useState(false);
  const dataLoadingState = useAppSelector((state) => state.weather.state);
  const suggestedCity = useAppSelector(
    (state) => state.location.locationSuggestion
  );
  const suggestedCityLoadingSate = useAppSelector(
    (state) => state.location.state
  );
  const loadingSuggestions = suggestedCityLoadingSate === RequestState.LOADING;
  const conditionLower =
    weatherDataResponse?.current?.condition?.text.toLowerCase() ?? "";

  useEffect(() => {
    if (dataLoadingState === RequestState.LOADING) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [dataLoadingState]);

  // Trigger fetch on typing
  useEffect(() => {
    if (searchQuery && searchQuery.length > 2) {
      dispatch(fetchLocation(searchQuery));
    }
  }, [searchQuery]);

  // Fetch data initially based on the location
  useEffect(() => {
    getUserLocation()
      .then(({ lat, lon }) => {
        dispatch(fetchWeather(`${lat},${lon}`));
      })
      .catch(() => {
        dispatch(fetchWeather("Colombo"));
      });
  }, [dispatch]);

  const getWeatherIcon = (isDay: number) => {
    const iconProps = {
      sx: { fontSize: { xs: 60, sm: 80 } },
    };

    // Determine color based on day/night
    const sunColor = isDay ? "#FFB74D" : "#FFA726";
    const cloudColor = "#90A4AE";

    if (conditionLower.includes("rain") || conditionLower.includes("drizzle")) {
      return (
        <BeachAccess
          {...iconProps}
          sx={{ ...iconProps.sx, color: "#42A5F5" }}
        />
      );
    } else if (conditionLower.includes("cloud")) {
      if (conditionLower.includes("partly")) {
        return (
          <WbCloudy
            {...iconProps}
            sx={{ ...iconProps.sx, color: cloudColor }}
          />
        );
      } else {
        return (
          <Cloud {...iconProps} sx={{ ...iconProps.sx, color: "#78909C" }} />
        );
      }
    } else if (
      conditionLower.includes("sunny") ||
      conditionLower.includes("clear")
    ) {
      return (
        <WbSunny {...iconProps} sx={{ ...iconProps.sx, color: sunColor }} />
      );
    } else {
      return (
        <WbSunny {...iconProps} sx={{ ...iconProps.sx, color: sunColor }} />
      );
    }
  };

  const getUVIndexColor = (uvIndex: number): string => {
    if (uvIndex <= 2) return "#4CAF50"; // Green
    if (uvIndex <= 5) return "#FF9800"; // Orange
    if (uvIndex <= 7) return "#FF5722"; // Deep Orange
    if (uvIndex <= 10) return "#F44336"; // Red
    return "#9C27B0"; // Purple
  };

  const getUVIndexText = (uvIndex: number): string => {
    if (uvIndex <= 2) return "Low";
    if (uvIndex <= 5) return "Moderate";
    if (uvIndex <= 7) return "High";
    if (uvIndex <= 10) return "Very High";
    return "Extreme";
  };

  interface WeatherCardProps {
    icon: React.ReactNode;
    title: string;
    value: number;
    unit: string;
    color?: "primary" | "secondary" | "success" | "info" | "warning" | "error";
    subtitle?: string;
  }

  const WeatherCard: React.FC<WeatherCardProps> = ({
    icon,
    title,
    value,
    unit,
    color = "primary",
    subtitle,
  }) => (
    <Card
      elevation={3}
      sx={{
        height: "100%",
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.95) 100%)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(0,0,0,0.05)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: theme.shadows[8],
        },
      }}
    >
      <CardContent sx={{ textAlign: "center", p: { xs: 2, sm: 3 } }}>
        <Avatar
          sx={{
            bgcolor: `${color}.main`,
            width: { xs: 48, sm: 56 },
            height: { xs: 48, sm: 56 },
            mx: "auto",
            mb: 2,
            boxShadow: theme.shadows[4],
          }}
        >
          {icon}
        </Avatar>
        <Typography
          variant={isMobile ? "subtitle1" : "h6"}
          color="text.secondary"
          gutterBottom
          fontWeight={500}
        >
          {title}
        </Typography>
        <Typography
          variant={isMobile ? "h5" : "h4"}
          fontWeight="bold"
          color="text.primary"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {value}
          <Typography
            component="span"
            variant={isMobile ? "body1" : "h6"}
            color="text.secondary"
            sx={{ ml: 0.5 }}
          >
            {unit}
          </Typography>
        </Typography>
        {subtitle && (
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );

  // Format location display
  const formatLocation = () => {
    const { name, region, country } = weatherDataResponse.location;
    if (region && region !== name) {
      return `${name}, ${region}, ${country}`;
    }
    return `${name}, ${country}`;
  };

  return (
    <Box
      sx={{
        height: "99vh",
        width: "99vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {dataLoadingState === RequestState.LOADING && <WeatherStatusComponent />}

      {dataLoadingState === RequestState.FAILED && (
        <WeatherStatusComponent
          isError={true}
          onRetry={() => window.location.reload()}
        />
      )}

      {dataLoadingState === RequestState.SUCCEEDED && weatherDataResponse && (
        <WeatherBackgroundAnimation condition={conditionLower}>
          <Container maxWidth="lg">
            {/* Header */}
            <Box textAlign="center" mb={{ xs: 3, sm: 4 }}>
              <Typography
                variant={isMobile ? "h4" : "h3"}
                fontWeight="bold"
                color="white"
                gutterBottom
                sx={{
                  textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                  mb: { xs: 1, sm: 2 },
                }}
              >
                Rain Or Shine
              </Typography>
              <Typography
                variant={isMobile ? "body1" : "h6"}
                color="rgba(255,255,255,0.9)"
                sx={{
                  textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                  px: { xs: 2, sm: 0 },
                }}
              >
                Real-time weather information at your fingertips
              </Typography>
            </Box>

            {/* Search Bar */}
            <Box mb={{ xs: 3, sm: 4 }}>
              <Autocomplete
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                loading={loadingSuggestions}
                options={Array.isArray(suggestedCity) ? suggestedCity : []}
                getOptionLabel={(option: CitySuggestion) =>
                  `${option.name}, ${option.region}, ${option.country}`
                }
                onInputChange={(_, newInputValue) => {
                  setSearchQuery(newInputValue);
                }}
                onChange={(e, selectedOption) => {
                  if (selectedOption) {
                    dispatch(fetchWeather(selectedOption.name));
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    variant="outlined"
                    placeholder="Search for a city..."
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <>
                          <InputAdornment position="start">
                            <Search color="action" />
                          </InputAdornment>
                          {params.InputProps.startAdornment}
                        </>
                      ),
                      endAdornment: (
                        <>
                          {loadingSuggestions ? (
                            <CircularProgress size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                    sx={{
                      maxWidth: 600,
                      mx: "auto",
                      display: "block",
                      "& .MuiOutlinedInput-root": {
                        bgcolor: "rgba(255,255,255,0.95)",
                        backdropFilter: "blur(10px)",
                        borderRadius: 2,
                      },
                    }}
                  />
                )}
              />
            </Box>

            {/* Main Weather Card */}
            <Card
              elevation={8}
              sx={{
                mb: { xs: 3, sm: 4 },
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 3,
              }}
            >
              <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                <Grid container spacing={3} alignItems="center">
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box display="flex" alignItems="center" mb={2}>
                      <LocationOn sx={{ color: "white", mr: 1 }} />
                      <Typography
                        variant={isMobile ? "h6" : "h5"}
                        color="white"
                        fontWeight="bold"
                      >
                        {formatLocation()}
                      </Typography>
                    </Box>

                    <Box
                      display="flex"
                      alignItems="center"
                      mb={2}
                      flexDirection={{ xs: "column", sm: "row" }}
                      textAlign={{ xs: "center", sm: "left" }}
                    >
                      <Typography
                        variant="h1"
                        color="white"
                        fontWeight="300"
                        sx={{
                          fontSize: { xs: "3rem", sm: "4rem", md: "5rem" },
                          lineHeight: 1,
                          mr: { xs: 0, sm: 2 },
                          mb: { xs: 1, sm: 0 },
                        }}
                      >
                        {Math.round(weatherDataResponse.current.temp_c)}°
                      </Typography>
                      <Box>
                        {getWeatherIcon(weatherDataResponse.current.is_day)}
                      </Box>
                    </Box>

                    <Typography
                      variant={isMobile ? "h6" : "h5"}
                      color="rgba(255,255,255,0.9)"
                      gutterBottom
                      textAlign={{ xs: "center", sm: "left" }}
                    >
                      {weatherDataResponse.current.condition.text}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="rgba(255,255,255,0.7)"
                      textAlign={{ xs: "center", sm: "left" }}
                    >
                      Feels like{" "}
                      {Math.round(weatherDataResponse.current.feelslike_c)}°C
                    </Typography>
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box textAlign={{ xs: "center", md: "right" }}>
                      <Chip
                        label={`Last updated: ${
                          weatherDataResponse.current.last_updated ||
                          "Loading..."
                        }`}
                        size={isMobile ? "small" : "medium"}
                        sx={{
                          bgcolor: "rgba(255,255,255,0.2)",
                          color: "white",
                          mb: 2,
                          "& .MuiChip-label": {
                            fontSize: { xs: "0.75rem", sm: "0.875rem" },
                          },
                        }}
                      />
                      {loading && (
                        <Box display="flex" justifyContent="center" mt={2}>
                          <CircularProgress size={24} sx={{ color: "white" }} />
                        </Box>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Weather Details Grid */}
            <Grid container spacing={{ xs: 2, sm: 3 }} mb={{ xs: 3, sm: 4 }}>
              <Grid size={{ xs: 4, md: 4, sm: 4 }}>
                <WeatherCard
                  icon={<Grain />}
                  title="Humidity"
                  value={weatherDataResponse.current.humidity}
                  unit="%"
                  color="info"
                />
              </Grid>

              <Grid size={{ xs: 4, md: 4, sm: 4 }}>
                <WeatherCard
                  icon={<Air />}
                  title="Wind Speed"
                  value={Math.round(weatherDataResponse.current.wind_kph)}
                  unit=" km/h"
                  color="success"
                  subtitle={`${weatherDataResponse.current.wind_dir} ${weatherDataResponse.current.wind_degree}°`}
                />
              </Grid>
              <Grid size={{ xs: 4, md: 4, sm: 4 }}>
                <WeatherCard
                  icon={<Visibility />}
                  title="Visibility"
                  value={weatherDataResponse.current.vis_km}
                  unit=" km"
                  color="secondary"
                />
              </Grid>
            </Grid>

            {/* UV Index Detail Card */}
            <Card
              elevation={3}
              sx={{
                mb: { xs: 3, sm: 4 },
                background: `linear-gradient(135deg, ${getUVIndexColor(
                  weatherDataResponse.current.uv
                )}20 0%, ${getUVIndexColor(
                  weatherDataResponse.current.uv
                )}10 100%)`,
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Grid container alignItems="center" spacing={2}>
                  <Grid size={{ xs: 12, sm: 8 }}>
                    <Box display="flex" alignItems="center" mb={1}>
                      <LightMode
                        sx={{
                          color: getUVIndexColor(
                            weatherDataResponse.current.uv
                          ),
                          mr: 1,
                        }}
                      />
                      <Typography
                        variant={isMobile ? "h6" : "h5"}
                        color="white"
                        fontWeight={500}
                      >
                        UV Index Details
                      </Typography>
                    </Box>
                    <Typography variant="body1" color="rgba(255,255,255,0.8)">
                      Current UV radiation level
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={(weatherDataResponse.current.uv / 11) * 100}
                      sx={{
                        mt: 1,
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: "rgba(255,255,255,0.2)",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: getUVIndexColor(
                            weatherDataResponse.current.uv
                          ),
                          borderRadius: 4,
                        },
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <Box textAlign={{ xs: "center", sm: "right" }}>
                      <Typography
                        variant={isMobile ? "h3" : "h2"}
                        fontWeight="bold"
                        sx={{
                          color: getUVIndexColor(
                            weatherDataResponse.current.uv
                          ),
                        }}
                        gutterBottom
                      >
                        {weatherDataResponse.current.uv}
                      </Typography>
                      <Chip
                        label={getUVIndexText(weatherDataResponse.current.uv)}
                        sx={{
                          backgroundColor: getUVIndexColor(
                            weatherDataResponse.current.uv
                          ),
                          color: "white",
                          fontWeight: "bold",
                        }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Additional Weather Info */}
            <Grid container spacing={{ xs: 2, sm: 3 }} mb={{ xs: 3, sm: 4 }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Card
                  elevation={3}
                  sx={{
                    height: "100%",
                    background: "rgba(255,255,255,0.15)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Thermostat sx={{ color: "white", mr: 1 }} />
                      <Typography
                        variant={isMobile ? "h6" : "h5"}
                        color="white"
                        fontWeight={500}
                      >
                        Temperature Details
                      </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" mb={2}>
                      <Typography color="rgba(255,255,255,0.8)" variant="body1">
                        Current
                      </Typography>
                      <Typography color="white" fontWeight="bold" variant="h6">
                        {Math.round(weatherDataResponse.current.temp_c)}°C
                      </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" mb={2}>
                      <Typography color="rgba(255,255,255,0.8)" variant="body1">
                        Feels like
                      </Typography>
                      <Typography color="white" fontWeight="bold" variant="h6">
                        {Math.round(weatherDataResponse.current.feelslike_c)}°C
                      </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      <Typography color="rgba(255,255,255,0.8)" variant="body1">
                        Heat Index
                      </Typography>
                      <Typography color="white" fontWeight="bold" variant="h6">
                        {Math.round(weatherDataResponse.current.heatindex_c)}°C
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Card
                  elevation={3}
                  sx={{
                    height: "100%",
                    background: "rgba(255,255,255,0.15)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Speed sx={{ color: "white", mr: 1 }} />
                      <Typography
                        variant={isMobile ? "h6" : "h5"}
                        color="white"
                        fontWeight={500}
                      >
                        Atmospheric Pressure
                      </Typography>
                    </Box>
                    <Typography
                      variant={isMobile ? "h4" : "h3"}
                      color="white"
                      fontWeight="bold"
                      gutterBottom
                    >
                      {Math.round(weatherDataResponse.current.pressure_mb)}
                      <Typography
                        component="span"
                        variant={isMobile ? "h6" : "h5"}
                        color="rgba(255,255,255,0.8)"
                        sx={{ ml: 1 }}
                      >
                        mb
                      </Typography>
                    </Typography>
                    <Typography variant="body2" color="rgba(255,255,255,0.7)">
                      Standard atmospheric pressure •{" "}
                      {weatherDataResponse.current.pressure_in}" Hg
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Precipitation and Cloud Info */}
            <Grid container spacing={{ xs: 2, sm: 3 }} mb={{ xs: 3, sm: 4 }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Card
                  elevation={3}
                  sx={{
                    height: "100%",
                    background: "rgba(255,255,255,0.15)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                    <Box display="flex" alignItems="center" mb={2}>
                      <BeachAccess sx={{ color: "white", mr: 1 }} />
                      <Typography
                        variant={isMobile ? "h6" : "h5"}
                        color="white"
                        fontWeight={500}
                      >
                        Precipitation
                      </Typography>
                    </Box>
                    <Typography
                      variant={isMobile ? "h4" : "h3"}
                      color="white"
                      fontWeight="bold"
                      gutterBottom
                    >
                      {weatherDataResponse.current.precip_mm}
                      <Typography
                        component="span"
                        variant={isMobile ? "h6" : "h5"}
                        color="rgba(255,255,255,0.8)"
                        sx={{ ml: 1 }}
                      >
                        mm
                      </Typography>
                    </Typography>
                    <Typography variant="body2" color="rgba(255,255,255,0.7)">
                      Last hour • {weatherDataResponse.current.precip_in}"
                      inches
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Card
                  elevation={3}
                  sx={{
                    height: "100%",
                    background: "rgba(255,255,255,0.15)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                    <Box display="flex" alignItems="center" mb={2}>
                      <CloudQueue sx={{ color: "white", mr: 1 }} />
                      <Typography
                        variant={isMobile ? "h6" : "h5"}
                        color="white"
                        fontWeight={500}
                      >
                        Cloud Cover
                      </Typography>
                    </Box>
                    <Typography
                      variant={isMobile ? "h4" : "h3"}
                      color="white"
                      fontWeight="bold"
                      gutterBottom
                    >
                      {weatherDataResponse.current.cloud}
                      <Typography
                        component="span"
                        variant={isMobile ? "h6" : "h5"}
                        color="rgba(255,255,255,0.8)"
                        sx={{ ml: 1 }}
                      >
                        %
                      </Typography>
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={weatherDataResponse.current.cloud}
                      sx={{
                        mt: 1,
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: "rgba(255,255,255,0.2)",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: "#90A4AE",
                          borderRadius: 4,
                        },
                      }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Footer */}
            <Box textAlign="center">
              <Typography variant="body2" color="rgba(255,255,255,0.7)">
                Weather data provided by WeatherAPI.com
              </Typography>
            </Box>
          </Container>
        </WeatherBackgroundAnimation>
      )}
    </Box>
  );
};

export default WeatherApp;
