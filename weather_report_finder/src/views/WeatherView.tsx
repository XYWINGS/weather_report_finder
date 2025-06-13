import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Chip,
  TextField,
  InputAdornment,
  CircularProgress,
  Container,
  useTheme,
  useMediaQuery,
  LinearProgress,
} from "@mui/material";
import {
  WbSunny,
  Cloud,
  Grain,
  Air,
  Visibility,
  Thermostat,
  Search,
  LocationOn,
  Speed,
  WbCloudy,
  LightMode,
} from "@mui/icons-material";

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  uvIndex: number;
  visibility: number;
  feelsLike: number;
  pressure: number;
  lastUpdated: string;
}

const WeatherApp: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // sample data
  const weatherData: WeatherData = {
    location: "Colombo, Sri Lanka",
    temperature: 28,
    condition: "Partly Cloudy",
    humidity: 76,
    windSpeed: 12,
    uvIndex: 7,
    visibility: 10,
    feelsLike: 32,
    pressure: 1013,
    lastUpdated: "2025-06-13 14:30",
  };

  const getWeatherIcon = (condition: string) => {
    const iconProps = { sx: { fontSize: { xs: 60, sm: 80 }, color: "#FFB74D" } };

    switch (condition.toLowerCase()) {
      case "partly cloudy":
        return <WbCloudy {...iconProps} sx={{ ...iconProps.sx, color: "#90A4AE" }} />;
      case "sunny":
        return <WbSunny {...iconProps} />;
      case "cloudy":
        return <Cloud {...iconProps} sx={{ ...iconProps.sx, color: "#78909C" }} />;
      default:
        return <WbSunny {...iconProps} />;
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

  const WeatherCard: React.FC<WeatherCardProps> = ({ icon, title, value, unit, color = "primary", subtitle }) => (
    <Card
      elevation={3}
      sx={{
        height: "100%",
        background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.95) 100%)",
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
        <Typography variant={isMobile ? "subtitle1" : "h6"} color="text.secondary" gutterBottom fontWeight={500}>
          {title}
        </Typography>
        <Typography
          variant={isMobile ? "h5" : "h4"}
          fontWeight="bold"
          color="text.primary"
          sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          {value}
          <Typography component="span" variant={isMobile ? "body1" : "h6"} color="text.secondary" sx={{ ml: 0.5 }}>
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

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "99vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          minHeight: "90%",
          width: "98%",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          py: { xs: 2, sm: 4 },
          px: { xs: 1, sm: 2 },
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
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
              Weather Reporter
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
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search for a city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="action" />
                  </InputAdornment>
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
                  "&:hover fieldset": {
                    borderColor: "primary.main",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "primary.main",
                  },
                },
              }}
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
                    <Typography variant={isMobile ? "h6" : "h5"} color="white" fontWeight="bold">
                      {weatherData.location}
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
                      {weatherData.temperature}°
                    </Typography>
                    <Box>{getWeatherIcon(weatherData.condition)}</Box>
                  </Box>

                  <Typography
                    variant={isMobile ? "h6" : "h5"}
                    color="rgba(255,255,255,0.9)"
                    gutterBottom
                    textAlign={{ xs: "center", sm: "left" }}
                  >
                    {weatherData.condition}
                  </Typography>
                  <Typography variant="body1" color="rgba(255,255,255,0.7)" textAlign={{ xs: "center", sm: "left" }}>
                    Feels like {weatherData.feelsLike}°C
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Box textAlign={{ xs: "center", md: "right" }}>
                    <Chip
                      label={`Last updated: ${weatherData.lastUpdated}`}
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
            <Grid size={{ xs: 6, md: 3, sm: 6 }}>
              <WeatherCard icon={<Grain />} title="Humidity" value={weatherData.humidity} unit="%" color="info" />
            </Grid>

            <Grid size={{ xs: 6, md: 3, sm: 6 }}>
              <WeatherCard
                icon={<Air />}
                title="Wind Speed"
                value={weatherData.windSpeed}
                unit=" km/h"
                color="success"
              />
            </Grid>

            <Grid size={{ xs: 6, md: 3, sm: 6 }}>
              <WeatherCard
                icon={<WbSunny />}
                title="UV Index"
                value={weatherData.uvIndex}
                unit=""
                color="warning"
                subtitle={getUVIndexText(weatherData.uvIndex)}
              />
            </Grid>

            <Grid size={{ xs: 6, md: 3, sm: 6 }}>
              <WeatherCard
                icon={<Visibility />}
                title="Visibility"
                value={weatherData.visibility}
                unit=" km"
                color="secondary"
              />
            </Grid>
          </Grid>

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
                    <Typography variant={isMobile ? "h6" : "h5"} color="white" fontWeight={500}>
                      Temperature Details
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" mb={2}>
                    <Typography color="rgba(255,255,255,0.8)" variant="body1">
                      Current
                    </Typography>
                    <Typography color="white" fontWeight="bold" variant="h6">
                      {weatherData.temperature}°C
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography color="rgba(255,255,255,0.8)" variant="body1">
                      Feels like
                    </Typography>
                    <Typography color="white" fontWeight="bold" variant="h6">
                      {weatherData.feelsLike}°C
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
                    <Typography variant={isMobile ? "h6" : "h5"} color="white" fontWeight={500}>
                      Atmospheric Pressure
                    </Typography>
                  </Box>
                  <Typography variant={isMobile ? "h4" : "h3"} color="white" fontWeight="bold" gutterBottom>
                    {weatherData.pressure}
                    <Typography
                      component="span"
                      variant={isMobile ? "h6" : "h5"}
                      color="rgba(255,255,255,0.8)"
                      sx={{ ml: 1 }}
                    >
                      hPa
                    </Typography>
                  </Typography>
                  <Typography variant="body2" color="rgba(255,255,255,0.7)">
                    Standard atmospheric pressure
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* UV Index Detail Card */}
          <Card
            elevation={3}
            sx={{
              mb: { xs: 3, sm: 4 },
              background: `linear-gradient(135deg, ${getUVIndexColor(weatherData.uvIndex)}20 0%, ${getUVIndexColor(
                weatherData.uvIndex
              )}10 100%)`,
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Grid container alignItems="center" spacing={2}>
                <Grid size={{ xs: 12, sm: 8 }}>
                  <Box display="flex" alignItems="center" mb={1}>
                    <LightMode sx={{ color: getUVIndexColor(weatherData.uvIndex), mr: 1 }} />
                    <Typography variant={isMobile ? "h6" : "h5"} color="white" fontWeight={500}>
                      UV Index Details
                    </Typography>
                  </Box>
                  <Typography variant="body1" color="rgba(255,255,255,0.8)">
                    Current UV radiation level
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={(weatherData.uvIndex / 11) * 100}
                    sx={{
                      mt: 1,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: "rgba(255,255,255,0.2)",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: getUVIndexColor(weatherData.uvIndex),
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
                      sx={{ color: getUVIndexColor(weatherData.uvIndex) }}
                      gutterBottom
                    >
                      {weatherData.uvIndex}
                    </Typography>
                    <Chip
                      label={getUVIndexText(weatherData.uvIndex)}
                      sx={{
                        backgroundColor: getUVIndexColor(weatherData.uvIndex),
                        color: "white",
                        fontWeight: "bold",
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Footer */}
          <Box textAlign="center">
            <Typography variant="body2" color="rgba(255,255,255,0.7)">
              Weather data provided by WeatherAPI.com
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default WeatherApp;
