import React from "react";
import { Box, keyframes } from "@mui/material";

// Animation keyframes
const rainDrop = keyframes`
  0% {
    transform: translateY(-100vh) rotate(10deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(10deg);
    opacity: 0;
  }
`;

const snowFlake = keyframes`
  0% {
    transform: translateY(-100vh) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(360deg);
    opacity: 0;
  }
`;

const cloudFloat = keyframes`
  0% {
    transform: translateX(-100px);
    opacity: 0.3;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    transform: translateX(calc(100vw + 100px));
    opacity: 0.3;
  }
`;

const sunPulse = keyframes`
  0% {
    box-shadow: 
      0 0 20px rgba(255, 215, 0, 0.4),
      0 0 40px rgba(255, 165, 0, 0.3),
      0 0 60px rgba(255, 140, 0, 0.2);
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    box-shadow: 
      0 0 40px rgba(255, 215, 0, 0.8),
      0 0 80px rgba(255, 165, 0, 0.6),
      0 0 120px rgba(255, 140, 0, 0.4),
      0 0 160px rgba(255, 140, 0, 0.2);
    transform: translate(-50%, -50%) scale(1.1);
  }
  100% {
    box-shadow: 
      0 0 20px rgba(255, 215, 0, 0.4),
      0 0 40px rgba(255, 165, 0, 0.3),
      0 0 60px rgba(255, 140, 0, 0.2);
    transform: translate(-50%, -50%) scale(1);
  }
`;

const lightning = keyframes`
  0%, 90%, 100% {
    opacity: 0;
  }
  5%, 10%, 15%, 20% {
    opacity: 1;
  }
`;

const mistFloat = keyframes`
  0% {
    transform: translateX(-50px);
    opacity: 0.3;
  }
  50% {
    opacity: 0.7;
  }
  100% {
    transform: translateX(50px);
    opacity: 0.3;
  }
`;

interface WeatherBackgroundProps {
  condition: string;
  children?: React.ReactNode;
}

export const WeatherBackgroundAnimation: React.FC<WeatherBackgroundProps> = ({
  condition,
  children,
}) => {
  const conditionLower = condition.toLowerCase();

  const getWeatherGradient = () => {
    if (conditionLower.includes("rain") || conditionLower.includes("storm")) {
      return "linear-gradient(135deg, #2c3e50 0%, #34495e 50%, #4a6741 100%)";
    } else if (conditionLower.includes("snow")) {
      return "linear-gradient(135deg, #e6f3ff 0%, #cce7ff 50%, #b3daff 100%)";
    } else if (conditionLower.includes("cloud")) {
      return "linear-gradient(135deg, #bdc3c7 0%, #95a5a6 50%, #7f8c8d 100%)";
    } else if (
      conditionLower.includes("sunny") ||
      conditionLower.includes("clear")
    ) {
      return "linear-gradient(135deg, #87CEEB 0%, #98D8E8 50%, #87CEEB 100%)";
    } else if (
      conditionLower.includes("mist") ||
      conditionLower.includes("fog")
    ) {
      return "linear-gradient(135deg, #d5d8dc 0%, #aeb6bf 50%, #85929e 100%)";
    }
    return "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
  };

  const renderRainAnimation = () => (
    <>
      {Array.from({ length: 50 }, (_, i) => (
        <Box
          key={`rain-${i}`}
          sx={{
            position: "absolute",
            left: `${Math.random() * 100}%`,
            width: "2px",
            height: "20px",
            background:
              "linear-gradient(to bottom, transparent, #42A5F5, transparent)",
            animation: `${rainDrop} ${1 + Math.random() * 2}s linear infinite`,
            animationDelay: `${Math.random() * 2}s`,
            zIndex: 1,
          }}
        />
      ))}
    </>
  );

  const renderSnowAnimation = () => (
    <>
      {Array.from({ length: 40 }, (_, i) => (
        <Box
          key={`snow-${i}`}
          sx={{
            position: "absolute",
            left: `${Math.random() * 100}%`,
            width: `${6 + Math.random() * 6}px`,
            height: `${6 + Math.random() * 6}px`,
            backgroundColor: "white",
            borderRadius: "50%",
            opacity: 0.9,
            boxShadow:
              "0 0 8px rgba(255, 255, 255, 0.8), inset 0 0 8px rgba(255, 255, 255, 0.3)",
            animation: `${snowFlake} ${4 + Math.random() * 4}s linear infinite`,
            animationDelay: `${Math.random() * 4}s`,
            zIndex: 1,
          }}
        />
      ))}
    </>
  );

  const renderCloudAnimation = () => (
    <>
      {Array.from({ length: 6 }, (_, i) => (
        <Box
          key={`cloud-${i}`}
          sx={{
            position: "absolute",
            top: `${5 + i * 12}%`,
            width: `${80 + Math.random() * 60}px`,
            height: `${40 + Math.random() * 30}px`,
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            borderRadius: "50px",
            animation: `${cloudFloat} ${
              20 + Math.random() * 15
            }s linear infinite`,
            animationDelay: `${Math.random() * 15}s`,
            zIndex: 1,
            boxShadow: "0 4px 15px rgba(255, 255, 255, 0.3)",
            "&::before": {
              content: '""',
              position: "absolute",
              top: "-20px",
              left: "25px",
              width: "40px",
              height: "40px",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              borderRadius: "50%",
              boxShadow: "0 2px 8px rgba(255, 255, 255, 0.3)",
            },
            "&::after": {
              content: '""',
              position: "absolute",
              top: "-15px",
              right: "20px",
              width: "35px",
              height: "35px",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              borderRadius: "50%",
              boxShadow: "0 2px 8px rgba(255, 255, 255, 0.3)",
            },
          }}
        />
      ))}
    </>
  );

  const renderSunnyAnimation = () => (
    <Box
      sx={{
        position: "absolute",
        top: "8%",
        right: "8%",
        width: "100px",
        height: "100px",
        zIndex: 1,
      }}
    >
      {/* Main sun with pulsing glow */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "50px",
          height: "50px",
          background:
            "radial-gradient(circle, #FFD700 0%, #FFA500 70%, #FF8C00 100%)",
          borderRadius: "50%",
          animation: `${sunPulse} 3s ease-in-out infinite`,
        }}
      />
    </Box>
  );
  
  const renderStormAnimation = () => (
    <>
      {renderRainAnimation()}
      {/* Lightning effect */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(255, 255, 255, 0.1)",
          animation: `${lightning} 3s infinite`,
          animationDelay: "1s",
          zIndex: 2,
        }}
      />
    </>
  );

  const renderMistAnimation = () => (
    <>
      {Array.from({ length: 6 }, (_, i) => (
        <Box
          key={`mist-${i}`}
          sx={{
            position: "absolute",
            top: `${20 + i * 10}%`,
            left: "-50px",
            width: "200px",
            height: "40px",
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
            borderRadius: "20px",
            animation: `${mistFloat} ${
              8 + Math.random() * 4
            }s ease-in-out infinite`,
            animationDelay: `${Math.random() * 4}s`,
            zIndex: 1,
          }}
        />
      ))}
    </>
  );

  const getWeatherAnimation = () => {
    if (conditionLower.includes("rain") && conditionLower.includes("storm")) {
      return renderStormAnimation();
    } else if (
      conditionLower.includes("rain") ||
      conditionLower.includes("drizzle")
    ) {
      return renderRainAnimation();
    } else if (conditionLower.includes("snow")) {
      return renderSnowAnimation();
    } else if (conditionLower.includes("cloud")) {
      return renderCloudAnimation();
    } else if (
      conditionLower.includes("sunny") ||
      conditionLower.includes("clear")
    ) {
      return renderSunnyAnimation();
    } else if (
      conditionLower.includes("mist") ||
      conditionLower.includes("fog")
    ) {
      return renderMistAnimation();
    }
    return null;
  };

  return (
    <Box
      sx={{
        minHeight: "90%",
        height: "100%",
        width: "98%",
        background: getWeatherGradient(),
        p: 2,
        overflowX: "hidden",
        overflowY: "auto",
        position: "relative",
      }}
    >
      {/* Weather animation layer */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        {getWeatherAnimation()}
      </Box>

      {/* Content layer */}
      <Box sx={{ position: "relative", zIndex: 3 }}>{children}</Box>
    </Box>
  );
};
