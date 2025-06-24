import {
  Box,
  Card,
  Chip,
  Stack,
  Avatar,
  Divider,
  useTheme,
  Typography,
  CardContent,
  useMediaQuery,
} from "@mui/material";
import { IconButton } from "@mui/material";
import React, { useRef, useEffect } from "react";
import type { HourlyForecastItem } from "@configs/types";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { WbSunny, Cloud, CloudQueue, Grain, AcUnit, Thunderstorm, Visibility, Air, Opacity } from "@mui/icons-material";

interface HourlyForecastCardProps {
  hourData: HourlyForecastItem;
  isMetric?: boolean;
  isCurrentHour?: boolean;
}

interface HourlyForecastListProps {
  hourlyData: HourlyForecastItem[];
  isMetric?: boolean;
  maxItems?: number;
}

// Weather condition icon mapping
const getWeatherIcon = (conditionCode: number, isDay: number) => {
  const iconMap: { [key: number]: React.ReactNode } = {
    1000: isDay ? <WbSunny /> : <WbSunny />, // Clear/Sunny
    1003: <CloudQueue />, // Partly cloudy
    1006: <Cloud />, // Cloudy
    1009: <Cloud />, // Overcast
    1030: <Visibility />, // Mist
    1063: <Grain />, // Patchy rain possible
    1066: <AcUnit />, // Patchy snow possible
    1087: <Thunderstorm />, // Thundery outbreaks possible
    1114: <AcUnit />, // Blowing snow
    1117: <AcUnit />, // Blizzard
    1135: <Visibility />, // Fog
    1147: <Visibility />, // Freezing fog
    1150: <Grain />, // Patchy light drizzle
    1153: <Grain />, // Light drizzle
    1168: <Grain />, // Freezing drizzle
    1171: <Grain />, // Heavy freezing drizzle
    1180: <Grain />, // Patchy light rain
    1183: <Grain />, // Light rain
    1186: <Grain />, // Moderate rain at times
    1189: <Grain />, // Moderate rain
    1192: <Grain />, // Heavy rain at times
    1195: <Grain />, // Heavy rain
    1198: <Grain />, // Light freezing rain
    1201: <Grain />, // Moderate or heavy freezing rain
    1204: <Grain />, // Light sleet
    1207: <Grain />, // Moderate or heavy sleet
    1210: <AcUnit />, // Patchy light snow
    1213: <AcUnit />, // Light snow
    1216: <AcUnit />, // Patchy moderate snow
    1219: <AcUnit />, // Moderate snow
    1222: <AcUnit />, // Patchy heavy snow
    1225: <AcUnit />, // Heavy snow
    1237: <AcUnit />, // Ice pellets
    1240: <Grain />, // Light rain shower
    1243: <Grain />, // Moderate or heavy rain shower
    1246: <Grain />, // Torrential rain shower
    1249: <Grain />, // Light sleet showers
    1252: <Grain />, // Moderate or heavy sleet showers
    1255: <AcUnit />, // Light snow showers
    1258: <AcUnit />, // Moderate or heavy snow showers
    1261: <AcUnit />, // Light showers of ice pellets
    1264: <AcUnit />, // Moderate or heavy showers of ice pellets
    1273: <Thunderstorm />, // Patchy light rain with thunder
    1276: <Thunderstorm />, // Moderate or heavy rain with thunder
    1279: <Thunderstorm />, // Patchy light snow with thunder
    1282: <Thunderstorm />, // Moderate or heavy snow with thunder
  };

  return iconMap[conditionCode] || <WbSunny />;
};

export const HourlyForecastCard: React.FC<HourlyForecastCardProps> = ({
  hourData,
  isMetric = true,
  isCurrentHour = false,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
    });
  };

  const temperature = isMetric ? hourData.temp_c : hourData.temp_f;
  const feelsLike = isMetric ? hourData.feelslike_c : hourData.feelslike_f;
  const windSpeed = isMetric ? hourData.wind_kph : hourData.wind_mph;
  const tempUnit = isMetric ? "°C" : "°F";
  const windUnit = isMetric ? "km/h" : "mph";

  return (
    <Card
      elevation={isCurrentHour ? 6 : 2}
      sx={{
        minWidth: { xs: 140, sm: 160 },
        height: "100%",
        position: "relative",
        background: "transparent",
        overflow: "visible",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isCurrentHour
            ? `linear-gradient(135deg,
                rgba(25, 118, 210, 0.4) 0%,
                rgba(25, 118, 210, 0.25) 50%,
                rgba(25, 118, 210, 0.15) 100%
              )`
            : `linear-gradient(135deg,
                rgba(255,255,255,0.2) 0%,
                rgba(255,255,255,0.1) 50%,
                rgba(255,255,255,0.05) 100%
              )`,
          backdropFilter: "blur(15px)",
          boxShadow: isCurrentHour
            ? `0 12px 15px rgba(25, 118, 210, 0.3),
               inset 0 1px 0 rgba(255,255,255,0.4)`
            : `0 4px 10px rgba(0,0,0,0.08),
               inset 0 1px 0 rgba(255,255,255,0.3)`,
          zIndex: -1,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        },
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateY(+4px) scale(1.02)",
          "&::before": {
            background: isCurrentHour
              ? `linear-gradient(135deg,
                  rgba(25, 118, 210, 0.5) 0%,
                  rgba(25, 118, 210, 0.35) 50%,
                  rgba(25, 118, 210, 0.25) 100%
                )`
              : `linear-gradient(135deg,
                  rgba(255,255,255,0.3) 0%,
                  rgba(255,255,255,0.2) 50%,
                  rgba(255,255,255,0.1) 100%
                )`,
            boxShadow: isCurrentHour
              ? `0 10px 15px rgba(25, 118, 210, 0.4),
                 inset 0 1px 0 rgba(255,255,255,0.5)`
              : `0 10px 15px rgba(0,0,0,0.12),
                 inset 0 1px 0 rgba(255,255,255,0.4)`,
          },
        },
      }}
    >
      <CardContent
        sx={{
          textAlign: "center",
          p: { xs: 2, sm: 2.5 },
          position: "relative",
          zIndex: 1,
          "&:last-child": { pb: { xs: 2, sm: 2.5 } },
        }}
      >
        {/* Time */}
        <Typography
          variant="caption"
          sx={{
            color: isCurrentHour ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.8)",
            fontWeight: isCurrentHour ? 700 : 600,
            mb: 1.5,
            display: "block",
            textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
            letterSpacing: "0.5px",
            fontSize: { xs: "0.7rem", sm: "0.75rem" },
          }}
        >
          {formatTime(hourData.time)}
        </Typography>

        {/* Weather Icon */}
        <Box sx={{ mb: 2 }}>
          <Avatar
            sx={{
              background: `linear-gradient(135deg,
                ${theme.palette.primary.light} 0%,
                ${theme.palette.primary.main} 100%
              )`,
              width: { xs: 36, sm: 42 },
              height: { xs: 36, sm: 42 },
              margin: "0 auto",
              boxShadow: `0 4px 12px ${theme.palette.primary.main}30`,
              border: "1px solid rgba(255,255,255,0.3)",
            }}
          >
            <Box sx={{ fontSize: { xs: 18, sm: 20 }, color: "white" }}>
              {getWeatherIcon(hourData.condition.code, hourData.is_day)}
            </Box>
          </Avatar>
        </Box>

        {/* Temperature */}
        <Typography
          variant={isMobile ? "h6" : "h5"}
          sx={{
            fontWeight: 800,
            background: "linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 1,
            fontSize: { xs: "1.1rem", sm: "1.3rem" },
          }}
        >
          {Math.round(temperature)}
          {tempUnit}
        </Typography>

        {/* Feels Like */}
        <Typography
          variant="caption"
          sx={{
            color: "rgba(255,255,255,0.7)",
            fontSize: { xs: "0.65rem", sm: "0.7rem" },
            mb: 1.5,
            display: "block",
          }}
        >
          Feels {Math.round(feelsLike)}
          {tempUnit}
        </Typography>

        {/* Weather Details */}
        <Stack spacing={0.5} alignItems="center">
          {/* Rain Chance */}
          {hourData.chance_of_rain > 0 && (
            <Chip
              icon={<Opacity sx={{ fontSize: "12px !important" }} />}
              label={`${hourData.chance_of_rain}%`}
              size="small"
              sx={{
                height: 20,
                fontSize: "0.65rem",
                background: "rgba(33, 150, 243, 0.2)",
                color: "rgba(255,255,255,0.9)",
                border: "1px solid rgba(33, 150, 243, 0.3)",
                "& .MuiChip-icon": {
                  color: "rgba(255,255,255,0.8)",
                },
              }}
            />
          )}

          {/* Wind */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <Air sx={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }} />
            <Typography
              variant="caption"
              sx={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "0.6rem",
              }}
            >
              {Math.round(windSpeed)} {windUnit}
            </Typography>
          </Box>
        </Stack>

        {/* Current Hour Indicator */}
        {isCurrentHour && (
          <Box
            sx={{
              position: "absolute",
              top: -2,
              left: "50%",
              transform: "translateX(-50%)",
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: theme.palette.primary.main,
              boxShadow: `0 0 8px ${theme.palette.primary.main}`,
            }}
          />
        )}
      </CardContent>
    </Card>
  );
};

export const HourlyForecastList: React.FC<HourlyForecastListProps> = ({
  hourlyData,
  isMetric = true,
  maxItems = 24,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const currentTime = new Date();
  const displayData = hourlyData.slice(0, maxItems);

  const isCurrentHour = (timeString: string) => {
    const hourTime = new Date(timeString);
    return Math.abs(currentTime.getTime() - hourTime.getTime()) < 30 * 60 * 1000;
  };

  const currentHourIndex = displayData.findIndex((hour) => isCurrentHour(hour.time));

  useEffect(() => {
    if (scrollContainerRef.current && currentHourIndex >= 0) {
      const container = scrollContainerRef.current;
      const cardWidth = isMobile ? 140 : 160;
      const gap = isMobile ? 12 : 16;
      const leftOffset = isMobile ? 40 : 60;
      const scrollPosition =
        (cardWidth + gap) * currentHourIndex - (container.clientWidth / 2 - cardWidth / 2) + leftOffset;

      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [currentHourIndex, isMobile]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.3;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <Card
      elevation={4}
      sx={{
        background: "transparent",
        position: "relative",
        overflow: "visible",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(135deg,
              rgba(255,255,255,0.15) 0%,
              rgba(255,255,255,0.08) 50%,
              rgba(255,255,255,0.03) 100%
            )`,
          backdropFilter: "blur(20px)",
          borderRadius: 3,
          border: "1px solid rgba(255,255,255,0.2)",
          boxShadow: `
              0 8px 32px rgba(0,0,0,0.1),
              inset 0 1px 0 rgba(255,255,255,0.3)
            `,
          zIndex: -1,
        },
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 }, position: "relative" }}>
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant={isMobile ? "h6" : "h5"}
            sx={{
              color: "rgba(255,255,255,0.95)",
              fontWeight: 700,
              textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
              letterSpacing: "0.5px",
            }}
          >
            24-Hour Forecast
          </Typography>
          <Divider
            sx={{
              mt: 1,
              background: `linear-gradient(90deg,
                  ${theme.palette.primary.main}60 0%,
                  transparent 100%
                )`,
              height: 2,
              border: "none",
            }}
          />
        </Box>

        <IconButton
          onClick={() => scroll("left")}
          sx={{
            position: "absolute",
            left: 8,
            top: "55%",
            transform: "translateY(-50%)",
            zIndex: 2,
            color: "white",
            backgroundColor: "rgba(0,0,0,0.5)",
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.7)",
            },
            width: 40,
            height: 40,
            visibility: "visible",
          }}
        >
          <ChevronLeft fontSize="medium" />
        </IconButton>

        <IconButton
          onClick={() => scroll("right")}
          sx={{
            position: "absolute",
            right: 8,
            top: "55%",
            transform: "translateY(-50%)",
            zIndex: 2,
            color: "white",
            backgroundColor: "rgba(0,0,0,0.5)",
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.7)",
            },
            width: 40,
            height: 40,
            visibility: "visible",
          }}
        >
          <ChevronRight fontSize="medium" />
        </IconButton>

        {/* Horizontal Scrollable List */}
        <Box
          ref={scrollContainerRef}
          sx={{
            display: "flex",
            gap: { xs: 1.5, sm: 2 },
            overflowX: "auto",
            pb: 3,
            scrollBehavior: "smooth",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            px: 4,
            borderRadius: 3,
          }}
        >
          {displayData.map((hourData, _) => (
            <Box key={hourData.time_epoch} sx={{ flexShrink: 0 }}>
              <HourlyForecastCard
                hourData={hourData}
                isMetric={isMetric}
                isCurrentHour={isCurrentHour(hourData.time)}
              />
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
