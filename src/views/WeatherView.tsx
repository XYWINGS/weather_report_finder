import {
  Box,
  Card,
  Chip,
  Grid,
  useTheme,
  Container,
  Typography,
  CardContent,
  useMediaQuery,
  LinearProgress,
  CircularProgress,
} from "@mui/material";
import {
  Air,
  Cloud,
  Grain,
  Speed,
  WbSunny,
  WbCloudy,
  LightMode,
  CloudQueue,
  Thermostat,
  LocationOn,
  Visibility,
  BeachAccess,
} from "@mui/icons-material";
import { getUserLocation } from "@configs/utils";
import React, { useEffect, useState } from "react";
import { fetchWeather } from "@slices/weatherSlice";
import { WeatherCard } from "./components/WeatherCard";
import WeatherHeader from "./components/WeatherHeader";
import { useAppDispatch, useAppSelector } from "@slices/store";
import { HourlyForecastList } from "./components/WeatherHourlyForecast";
import { WeatherStatusComponent } from "./components/WeatherStatusComponent";
import { WeatherBackgroundAnimation } from "./components/WeatherBackgroundAnimation";
import { rainCodes, clearCodes, cloudCodes, RequestState, partlyCloudyCodes } from "@configs/types";

const WeatherApp: React.FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const weatherDataResponse = useAppSelector((state) => state.weather.weatherData);
  const dataLoadingState = useAppSelector((state) => state.weather.state);

  const conditionCode = weatherDataResponse?.current?.condition?.code ?? 1000;

  useEffect(() => {
    if (dataLoadingState === RequestState.LOADING) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [dataLoadingState]);

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

  //Get icons based on the condition codes
  const getWeatherIcon = (conditionCode: number, isDay: number) => {
    const iconProps = {
      sx: { fontSize: { xs: 60, sm: 80 } },
    };

    const sunColor = isDay ? "#FFB74D" : "#FFA726";
    const cloudColor = "#90A4AE";

    if (rainCodes.has(conditionCode)) {
      return <BeachAccess {...iconProps} sx={{ ...iconProps.sx, color: "#42A5F5" }} />;
    } else if (cloudCodes.has(conditionCode)) {
      if (partlyCloudyCodes.has(conditionCode)) {
        return <WbCloudy {...iconProps} sx={{ ...iconProps.sx, color: cloudColor }} />;
      } else {
        return <Cloud {...iconProps} sx={{ ...iconProps.sx, color: "#78909C" }} />;
      }
    } else if (clearCodes.has(conditionCode)) {
      return <WbSunny {...iconProps} sx={{ ...iconProps.sx, color: sunColor }} />;
    }

    // Default fallback
    return <WbSunny {...iconProps} sx={{ ...iconProps.sx, color: sunColor }} />;
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
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {dataLoadingState === RequestState.LOADING && <WeatherStatusComponent />}

      {dataLoadingState === RequestState.FAILED && (
        <WeatherStatusComponent isError={true} onRetry={() => window.location.reload()} />
      )}

      {dataLoadingState === RequestState.SUCCEEDED && weatherDataResponse && (
        <WeatherBackgroundAnimation condition={conditionCode}>
          <WeatherHeader />

          <Container maxWidth="lg">
            {/* Main Weather Card */}
            <Card
              elevation={3}
              sx={{
                mb: { xs: 3, sm: 4 },
                mt: 3,
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 3,
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  transform: "translateY(+8px) scale(1.02)",
                  "&::before": {
                    background: `linear-gradient(135deg,
                    rgba(255,255,255,0.35) 0%,
                    rgba(255,255,255,0.25) 50%,
                    rgba(255,255,255,0.15) 100%
                  )`,
                    boxShadow: `
                    0 20px 60px rgba(0,0,0,0.2),
                    inset 0 1px 0 rgba(255,255,255,0.5)
                  `,
                  },
                },
              }}
            >
              <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                <Grid container spacing={3} alignItems="center">
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box display="flex" alignItems="center" mb={2}>
                      <LocationOn sx={{ color: "white", mr: 1 }} />
                      <Typography variant={isMobile ? "h6" : "h5"} color="white" fontWeight="bold">
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
                      <Box>{getWeatherIcon(conditionCode, weatherDataResponse.current.is_day)}</Box>
                    </Box>

                    <Typography
                      variant={isMobile ? "h6" : "h5"}
                      color="rgba(255,255,255,0.9)"
                      gutterBottom
                      textAlign={{ xs: "center", sm: "left" }}
                    >
                      {weatherDataResponse.current.condition.text}
                    </Typography>
                    <Typography variant="body1" color="rgba(255,255,255,0.7)" textAlign={{ xs: "center", sm: "left" }}>
                      Feels like {Math.round(weatherDataResponse.current.feelslike_c)}°C
                    </Typography>
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box textAlign={{ xs: "center", md: "right" }}>
                      <Chip
                        label={`Last updated: ${weatherDataResponse.current.last_updated || "Loading..."}`}
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

            {/* Weather Hourly Details */}
            <Box sx={{ mb: { xs: 3, sm: 4 } }}>
              <HourlyForecastList
                hourlyData={weatherDataResponse.forecast.forecastday[0].hour}
                isMetric={true}
                maxItems={24}
              />
            </Box>

            {/* Weather Details Grid */}
            <Grid container spacing={{ xs: 3, sm: 4 }} sx={{ mb: { xs: 3, sm: 4 } }}>
              <Grid size={{ xs: 12, md: 4, sm: 4 }}>
                <WeatherCard
                  icon={<Grain />}
                  title="Humidity"
                  value={weatherDataResponse.current.humidity}
                  unit="%"
                  color="info"
                />
              </Grid>

              <Grid size={{ xs: 12, md: 4, sm: 4 }}>
                <WeatherCard
                  icon={<Air />}
                  title="Wind Speed"
                  value={Math.round(weatherDataResponse.current.wind_kph)}
                  unit=" km/h"
                  color="success"
                  subtitle={`${weatherDataResponse.current.wind_dir} ${weatherDataResponse.current.wind_degree}°`}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4, sm: 4 }}>
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
                )}20 0%, ${getUVIndexColor(weatherDataResponse.current.uv)}10 100%)`,
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.2)",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  transform: "translateY(-8px) scale(1.02)",
                  "&::before": {
                    background: `linear-gradient(135deg,
                    rgba(255,255,255,0.35) 0%,
                    rgba(255,255,255,0.25) 50%,
                    rgba(255,255,255,0.15) 100%
                  )`,
                    boxShadow: `
                    0 20px 60px rgba(0,0,0,0.2),
                    inset 0 1px 0 rgba(255,255,255,0.5)
                  `,
                  },
                },
              }}
            >
              <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                <Grid container alignItems="center" spacing={2}>
                  <Grid size={{ xs: 12, sm: 8 }}>
                    <Box display="flex" alignItems="center" mb={1}>
                      <LightMode
                        sx={{
                          color: getUVIndexColor(weatherDataResponse.current.uv),
                          mr: 1,
                        }}
                      />
                      <Typography variant={isMobile ? "h6" : "h5"} color="white" fontWeight={500}>
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
                          backgroundColor: getUVIndexColor(weatherDataResponse.current.uv),
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
                          color: getUVIndexColor(weatherDataResponse.current.uv),
                        }}
                        gutterBottom
                      >
                        {weatherDataResponse.current.uv}
                      </Typography>
                      <Chip
                        label={getUVIndexText(weatherDataResponse.current.uv)}
                        sx={{
                          backgroundColor: getUVIndexColor(weatherDataResponse.current.uv),
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
            <Grid container spacing={{ xs: 3, sm: 4 }} mb={{ xs: 3, sm: 4 }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Card
                  elevation={3}
                  sx={{
                    height: "100%",
                    background: "rgba(255,255,255,0.15)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      transform: "translateY(-8px) scale(1.02)",
                      "&::before": {
                        background: `linear-gradient(135deg,
                        rgba(255,255,255,0.35) 0%,
                        rgba(255,255,255,0.25) 50%,
                        rgba(255,255,255,0.15) 100%
                      )`,
                        boxShadow: `
                        0 20px 60px rgba(0,0,0,0.2),
                        inset 0 1px 0 rgba(255,255,255,0.5)
                      `,
                      },
                    },
                  }}
                >
                  <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Thermostat sx={{ color: "white", mr: 1 }} />
                      <Typography variant={isMobile ? "h6" : "h5"} color="white" fontWeight={500}>
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
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      transform: "translateY(-8px) scale(1.02)",
                      "&::before": {
                        background: `linear-gradient(135deg,
                        rgba(255,255,255,0.35) 0%,
                        rgba(255,255,255,0.25) 50%,
                        rgba(255,255,255,0.15) 100%
                      )`,
                        boxShadow: `
                        0 20px 60px rgba(0,0,0,0.2),
                        inset 0 1px 0 rgba(255,255,255,0.5)
                      `,
                      },
                    },
                  }}
                >
                  <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Speed sx={{ color: "white", mr: 1 }} />
                      <Typography variant={isMobile ? "h6" : "h5"} color="white" fontWeight={500}>
                        Atmospheric Pressure
                      </Typography>
                    </Box>
                    <Typography variant={isMobile ? "h4" : "h3"} color="white" fontWeight="bold" gutterBottom>
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
                      Standard atmospheric pressure • {weatherDataResponse.current.pressure_in}" Hg
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Precipitation and Cloud Info */}
            <Grid container spacing={{ xs: 3, sm: 4 }} mb={{ xs: 3, sm: 4 }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Card
                  elevation={3}
                  sx={{
                    height: "100%",
                    background: "rgba(255,255,255,0.15)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      transform: "translateY(-8px) scale(1.02)",
                      "&::before": {
                        background: `linear-gradient(135deg,
                        rgba(255,255,255,0.35) 0%,
                        rgba(255,255,255,0.25) 50%,
                        rgba(255,255,255,0.15) 100%
                      )`,
                        boxShadow: `
                        0 20px 60px rgba(0,0,0,0.2),
                        inset 0 1px 0 rgba(255,255,255,0.5)
                      `,
                      },
                    },
                  }}
                >
                  <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                    <Box display="flex" alignItems="center" mb={2}>
                      <BeachAccess sx={{ color: "white", mr: 1 }} />
                      <Typography variant={isMobile ? "h6" : "h5"} color="white" fontWeight={500}>
                        Precipitation
                      </Typography>
                    </Box>
                    <Typography variant={isMobile ? "h4" : "h3"} color="white" fontWeight="bold" gutterBottom>
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
                      Last hour • {weatherDataResponse.current.precip_in}" inches
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
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      transform: "translateY(-8px) scale(1.02)",
                      "&::before": {
                        background: `linear-gradient(135deg,
                        rgba(255,255,255,0.35) 0%,
                        rgba(255,255,255,0.25) 50%,
                        rgba(255,255,255,0.15) 100%
                      )`,
                        boxShadow: `
                        0 20px 60px rgba(0,0,0,0.2),
                        inset 0 1px 0 rgba(255,255,255,0.5)
                      `,
                      },
                    },
                  }}
                >
                  <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                    <Box display="flex" alignItems="center" mb={2}>
                      <CloudQueue sx={{ color: "white", mr: 1 }} />
                      <Typography variant={isMobile ? "h6" : "h5"} color="white" fontWeight={500}>
                        Cloud Cover
                      </Typography>
                    </Box>
                    <Typography variant={isMobile ? "h4" : "h3"} color="white" fontWeight="bold" gutterBottom>
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
