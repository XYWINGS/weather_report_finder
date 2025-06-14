import {
  Air,
  Cloud,
  WbSunny,
  Warning,
  Refresh,
  WbCloudy,
  ErrorOutline,
} from "@mui/icons-material";
import {
  Box,
  Button,
  useTheme,
  Container,
  keyframes,
  Typography,
  useMediaQuery,
  LinearProgress,
} from "@mui/material";
import React from "react";

// Loading animation keyframes
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.1); }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
`;

interface WeatherStatusProps {
  isError?: boolean;
  errorMessage?: string;
  onRetry?: () => void;
}

export const WeatherStatusComponent: React.FC<WeatherStatusProps> = ({
  isError = false,
  errorMessage = "Failed to load weather data",
  onRetry,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const getBackgroundGradient = () => {
    if (isError) {
      return "linear-gradient(135deg, #667eea 0%, #f093fb 100%)";
    }
    return "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
  };

  const getMainIcon = () => {
    if (isError) {
      return (
        <ErrorOutline
          sx={{
            fontSize: 60,
            color: "#FF6B9D",
            filter: "drop-shadow(0 0 20px rgba(255,107,157,0.5))",
          }}
        />
      );
    }
    return (
      <WbSunny
        sx={{
          fontSize: 60,
          color: "#FFD700",
          filter: "drop-shadow(0 0 20px rgba(255,215,0,0.5))",
        }}
      />
    );
  };

  const getOrbitingElements = () => {
    if (isError) {
      return (
        <>
          <Warning
            sx={{
              position: "absolute",
              top: -10,
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: 30,
              color: "rgba(255,107,157,0.8)",
            }}
          />
          <ErrorOutline
            sx={{
              position: "absolute",
              bottom: -10,
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: 25,
              color: "rgba(255,107,157,0.6)",
            }}
          />
        </>
      );
    }
    return (
      <>
        <Cloud
          sx={{
            position: "absolute",
            top: -10,
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: 30,
            color: "rgba(255,255,255,0.8)",
          }}
        />
        <Air
          sx={{
            position: "absolute",
            bottom: -10,
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: 25,
            color: "rgba(255,255,255,0.6)",
          }}
        />
      </>
    );
  };

  return (
    <Box
      sx={{
        height: "99vh",
        width: "99vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: getBackgroundGradient(),
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated background elements */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "10%",
          animation: `${float} 6s ease-in-out infinite`,
        }}
      >
        <Cloud sx={{ fontSize: 60, color: "rgba(255,255,255,0.1)" }} />
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: "20%",
          right: "15%",
          animation: `${pulse} 4s ease-in-out infinite`,
        }}
      >
        {isError ? (
          <Warning sx={{ fontSize: 80, color: "rgba(255,255,255,0.1)" }} />
        ) : (
          <WbSunny sx={{ fontSize: 80, color: "rgba(255,255,255,0.1)" }} />
        )}
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: "20%",
          left: "20%",
          animation: `${float} 5s ease-in-out infinite reverse`,
        }}
      >
        <WbCloudy sx={{ fontSize: 50, color: "rgba(255,255,255,0.1)" }} />
      </Box>

      {/* Main content */}
      <Container maxWidth="sm">
        <Box textAlign="center">
          {/* Main icon */}
          <Box
            sx={{
              position: "relative",
              display: "inline-flex",
              mb: 4,
            }}
          >
            <Box
              sx={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                animation: isError
                  ? `${shake} 0.5s ease-in-out 3`
                  : `${spin} 3s linear infinite`,
                backdropFilter: "blur(10px)",
              }}
            >
              {getMainIcon()}
            </Box>

            {/* Orbiting elements */}
            <Box
              sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                animation: isError
                  ? `${pulse} 2s ease-in-out infinite`
                  : `${spin} 8s linear infinite reverse`,
              }}
            >
              {getOrbitingElements()}
            </Box>
          </Box>

          {/* Title */}
          <Typography
            variant={isMobile ? "h4" : "h3"}
            fontWeight="bold"
            color="white"
            gutterBottom
            sx={{
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
              mb: 2,
            }}
          >
            Weather Reporter
          </Typography>

          {/* Status message */}
          <Typography
            variant={isMobile ? "h6" : "h5"}
            color="rgba(255,255,255,0.9)"
            gutterBottom
            sx={{
              textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
              mb: 3,
            }}
          >
            {isError ? "Oops! Something went wrong" : "Loading weather data..."}
          </Typography>

          {/* Progress indicator or error message */}
          {!isError ? (
            <Box sx={{ width: "100%", mb: 3 }}>
              <LinearProgress
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "rgba(255,255,255,0.2)",
                  "& .MuiLinearProgress-bar": {
                    background:
                      "linear-gradient(90deg, #FFD700, #FFA500, #FF6B6B)",
                    borderRadius: 4,
                    animation: `${shimmer} 2s infinite`,
                  },
                }}
              />
            </Box>
          ) : (
            <Typography
              variant="body1"
              color="rgba(255,255,255,0.8)"
              sx={{
                mb: 3,
                fontStyle: "italic",
              }}
            >
              {errorMessage}
            </Typography>
          )}

          {/* Loading dots or retry button */}
          {!isError ? (
            <Box display="flex" justifyContent="center" gap={1}>
              {[0, 1, 2].map((index) => (
                <Box
                  key={index}
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor: "rgba(255,255,255,0.8)",
                    animation: `${pulse} 1.5s ease-in-out infinite`,
                    animationDelay: `${index * 0.2}s`,
                  }}
                />
              ))}
            </Box>
          ) : (
            onRetry && (
              <Button
                variant="contained"
                startIcon={<Refresh />}
                onClick={onRetry}
                sx={{
                  background: "linear-gradient(90deg, #FF6B9D, #C44569)",
                  color: "white",
                  fontWeight: "bold",
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  textTransform: "none",
                  fontSize: "1.1rem",
                  boxShadow: "0 4px 15px rgba(255,107,157,0.3)",
                  "&:hover": {
                    background: "linear-gradient(90deg, #C44569, #FF6B9D)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 20px rgba(255,107,157,0.4)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Try Again
              </Button>
            )
          )}

          <Typography
            variant="body2"
            color="rgba(255,255,255,0.7)"
            sx={{ mt: 3 }}
          >
            {isError
              ? "Please check your connection and try again"
              : "Fetching the latest weather information..."}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
