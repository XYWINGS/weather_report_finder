import React from "react";
import { Box, keyframes } from "@mui/material";
import { mistCodes, rainCodes, snowCodes, stormCodes, cloudCodes, clearCodes } from "@configs/types";

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

const lightningKeyframes = `
    @keyframes lightning {
      0% { opacity: 0; }
      2% { opacity: 1; }
      4% { opacity: 0; }
      6% { opacity: 1; }
      8% { opacity: 0; }
      100% { opacity: 0; }
    }
  `;

const lightningBoltKeyframes = `
    @keyframes lightningBolt {
      0% { opacity: 0; transform: scaleY(0); }
      1% { opacity: 1; transform: scaleY(1); }
      3% { opacity: 1; transform: scaleY(1); }
      5% { opacity: 0; transform: scaleY(0); }
      100% { opacity: 0; transform: scaleY(0); }
    }
  `;

const skyFlashKeyframes = `
    @keyframes skyFlash {
      0% { background: rgba(135, 206, 235, 0.1); }
      2% { background: rgba(255, 255, 255, 0.4); }
      4% { background: rgba(135, 206, 235, 0.1); }
      6% { background: rgba(255, 255, 255, 0.3); }
      8% { background: rgba(135, 206, 235, 0.1); }
      100% { background: rgba(135, 206, 235, 0.1); }
    }
  `;

const rainKeyframes = `
    @keyframes rainFall {
      0% { transform: translateY(-100vh); opacity: 1; }
      100% { transform: translateY(100vh); opacity: 0; }
    }
  `;

interface WeatherBackgroundProps {
  condition: number;
  children?: React.ReactNode;
}

export const WeatherBackgroundAnimation: React.FC<WeatherBackgroundProps> = ({ condition, children }) => {
  const renderRainAnimation = () => (
    <>
      {Array.from({ length: 50 }, (_, i) => (
        <Box
          key={`rain-${i}`}
          sx={{
            position: "absolute",
            left: `${Math.random() * 100}%`,
            width: "5px",
            height: "50px",
            background: "linear-gradient(to bottom, transparent, #42A5F5, transparent)",
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
            boxShadow: "0 0 8px rgba(255, 255, 255, 0.8), inset 0 0 8px rgba(255, 255, 255, 0.3)",
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
            animation: `${cloudFloat} ${20 + Math.random() * 15}s linear infinite`,
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
          background: "radial-gradient(circle, #FFD700 0%, #FFA500 70%, #FF8C00 100%)",
          borderRadius: "50%",
          animation: `${sunPulse} 3s ease-in-out infinite`,
        }}
      />
    </Box>
  );

  const renderStormAnimation = () => {
    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        {/* Inject keyframes */}
        <style>
          {lightningKeyframes}
          {lightningBoltKeyframes}
          {skyFlashKeyframes}
          {rainKeyframes}
        </style>

        {/* Rain Animation */}
        {renderRainAnimation()}

        {/* Sky flash effect */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            animation: "skyFlash 4s infinite",
            animationDelay: "1s",
            zIndex: 1,
          }}
        />

        {/* First lightning bolt */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "30%",
            width: "4px",
            height: "200px",
            background: "linear-gradient(to bottom, #ffffff, #87ceeb, transparent)",
            borderRadius: "2px",
            transformOrigin: "top center",
            animation: "lightningBolt 4s infinite",
            animationDelay: "1s",
            zIndex: 2,
            boxShadow: "0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(135, 206, 235, 0.4)",
          }}
        >
          {/* Branch 1 */}
          <div
            style={{
              position: "absolute",
              top: "60%",
              left: "50%",
              width: "3px",
              height: "80px",
              background: "linear-gradient(135deg, #ffffff, transparent)",
              transform: "rotate(25deg) translateX(-50%)",
              borderRadius: "2px",
            }}
          />
          {/* Branch 2 */}
          <div
            style={{
              position: "absolute",
              top: "40%",
              right: "50%",
              width: "2px",
              height: "60px",
              background: "linear-gradient(45deg, #ffffff, transparent)",
              transform: "rotate(-30deg) translateX(50%)",
              borderRadius: "2px",
            }}
          />
        </div>

        {/* Second lightning bolt */}
        <div
          style={{
            position: "absolute",
            top: "15%",
            left: "65%",
            width: "3px",
            height: "180px",
            background: "linear-gradient(to bottom, #ffffff, #87ceeb, transparent)",
            borderRadius: "2px",
            transformOrigin: "top center",
            animation: "lightningBolt 4s infinite",
            animationDelay: "1.5s",
            zIndex: 2,
            boxShadow: "0 0 15px rgba(255, 255, 255, 0.6), 0 0 30px rgba(135, 206, 235, 0.3)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "2px",
              height: "70px",
              background: "linear-gradient(120deg, #ffffff, transparent)",
              transform: "rotate(20deg) translateX(-50%)",
              borderRadius: "2px",
            }}
          />
        </div>

        {/* Third lightning bolt */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "45%",
            width: "2px",
            height: "150px",
            background: "linear-gradient(to bottom, #ffffff, #87ceeb, transparent)",
            borderRadius: "2px",
            transformOrigin: "top center",
            animation: "lightningBolt 4s infinite",
            animationDelay: "2.2s",
            zIndex: 2,
            boxShadow: "0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(135, 206, 235, 0.2)",
          }}
        />
      </div>
    );
  };

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
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
            borderRadius: "20px",
            animation: `${mistFloat} ${8 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 4}s`,
            zIndex: 1,
          }}
        />
      ))}
    </>
  );

  const getWeatherGradient = (conditionCode: number) => {
    // Stormy weather (thunderstorms, heavy rain)
    if (stormCodes.has(conditionCode)) {
      return "linear-gradient(135deg, #1a2a4a 0%, #2c3e6e 40%, #3d518f 70%, #4e64b0 100%)";
    }

    // Rainy weather
    if (rainCodes.has(conditionCode)) {
      return "linear-gradient(135deg, #3a516b 0%, #4a6b8a 40%, #5a85a9 70%, #6a9fc8 100%)";
    }

    // Snowy weather
    if (snowCodes.has(conditionCode)) {
      return "linear-gradient(135deg, #e6f0f9 0%, #d0e4f5 30%, #bbd8f0 60%, #a5cceb 100%)";
    }

    // Cloudy weather
    if (cloudCodes.has(conditionCode)) {
      return "linear-gradient(135deg, #a7b8d1 0%, #8fa3c2 30%, #778eb3 60%, #5f79a4 100%)";
    }

    // Clear/sunny weather
    if (clearCodes.has(conditionCode)) {
      return "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)";
    }

    // Misty/foggy weather
    if (mistCodes.has(conditionCode)) {
      return "linear-gradient(135deg, #d9e2ec 0%, #b8c7db 50%, #97acca 100%)";
    }

    // Default gradient
    return "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)";
  };

  const getWeatherAnimation = (conditionCode: number) => {
    if (stormCodes.has(conditionCode)) {
      return renderStormAnimation();
    } else if (rainCodes.has(conditionCode)) {
      return renderRainAnimation();
    } else if (snowCodes.has(conditionCode)) {
      return renderSnowAnimation();
    } else if (cloudCodes.has(conditionCode)) {
      return renderCloudAnimation();
    } else if (clearCodes.has(conditionCode)) {
      return renderSunnyAnimation();
    } else if (mistCodes.has(conditionCode)) {
      return renderMistAnimation();
    }
    return null;
  };

  return (
    <Box
      sx={{
        minHeight: "100%",
        height: "100vh",
        width: "100%",
        background: getWeatherGradient(condition),
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
          height: "160%",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        {getWeatherAnimation(condition)}
      </Box>

      {/* Content layer */}
      <Box sx={{ position: "relative", zIndex: 3 }}>{children}</Box>
    </Box>
  );
};
