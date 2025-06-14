import {
  Box,
  Card,
  Avatar,
  useTheme,
  Typography,
  CardContent,
  useMediaQuery,
} from "@mui/material";

interface WeatherCardProps {
  icon: React.ReactNode;
  title: string;
  value: number;
  unit: string;
  color?: "primary" | "secondary" | "success" | "info" | "warning" | "error";
  subtitle?: string;
}
export const WeatherCard: React.FC<WeatherCardProps> = ({
  icon,
  title,
  value,
  unit,
  color = "primary",
  subtitle,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card
      elevation={0}
      sx={{
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
          background: `linear-gradient(135deg, 
          rgba(255,255,255,0.25) 0%, 
          rgba(255,255,255,0.15) 50%,
          rgba(255,255,255,0.05) 100%
        )`,
          backdropFilter: "blur(20px)",
          borderRadius: 3,
          border: "1px solid rgba(255,255,255,0.3)",
          boxShadow: `
          0 8px 32px rgba(0,0,0,0.12),
          inset 0 1px 0 rgba(255,255,255,0.4)
        `,
          zIndex: -1,
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        },
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
      <CardContent
        sx={{
          textAlign: "center",
          p: { xs: 3, sm: 4 },
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Enhanced Icon Container */}
        <Box
          sx={{
            position: "relative",
            display: "inline-flex",
            mb: 3,
            "&::before": {
              content: '""',
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: 80, sm: 90 },
              height: { xs: 80, sm: 90 },
              background: `linear-gradient(135deg, 
              ${theme.palette[color].light}20, 
              ${theme.palette[color].main}15
            )`,
              borderRadius: "50%",
              filter: "blur(20px)",
              zIndex: -1,
            },
          }}
        >
          <Avatar
            sx={{
              background: `linear-gradient(135deg, 
              ${theme.palette[color].light} 0%, 
              ${theme.palette[color].main} 100%
            )`,
              width: { xs: 56, sm: 64 },
              height: { xs: 56, sm: 64 },
              boxShadow: `
              0 8px 24px ${theme.palette[color].main}30,
              inset 0 1px 0 rgba(255,255,255,0.3)
            `,
              border: `2px solid ${theme.palette[color].light}40`,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.1) rotate(5deg)",
                boxShadow: `
                0 12px 32px ${theme.palette[color].main}40,
                inset 0 1px 0 rgba(255,255,255,0.4)
              `,
              },
            }}
          >
            <Box sx={{ fontSize: { xs: 24, sm: 28 }, color: "white" }}>
              {icon}
            </Box>
          </Avatar>
        </Box>

        {/* Enhanced Title */}
        <Typography
          variant={isMobile ? "subtitle1" : "h6"}
          sx={{
            color: "rgba(255,255,255,0.9)",
            fontWeight: 600,
            mb: 2,
            textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
            letterSpacing: "0.5px",
            textTransform: "uppercase",
            fontSize: { xs: "0.875rem", sm: "1rem" },
          }}
        >
          {title}
        </Typography>

        {/* Enhanced Value Display */}
        <Box
          sx={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "center",
            mb: subtitle ? 2 : 1,
            position: "relative",
          }}
        >
          <Typography
            variant={isMobile ? "h4" : "h3"}
            sx={{
              fontWeight: 800,
              background: "linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "none",
              letterSpacing: "-0.02em",
              fontSize: { xs: "2rem", sm: "2.5rem" },
            }}
          >
            {value}
          </Typography>
          <Typography
            component="span"
            variant={isMobile ? "subtitle1" : "h6"}
            sx={{
              ml: 1,
              color: "rgba(255,255,255,0.7)",
              fontWeight: 500,
              textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
            }}
          >
            {unit}
          </Typography>
        </Box>

        {/* Enhanced Subtitle */}
        {subtitle && (
          <Typography
            variant="caption"
            sx={{
              color: "rgba(255,255,255,0.8)",
              fontWeight: 500,
              textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
              letterSpacing: "0.3px",
              fontSize: { xs: "0.75rem", sm: "0.8rem" },
            }}
          >
            {subtitle}
          </Typography>
        )}

        {/* Subtle Accent Line */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: "20%",
            right: "20%",
            height: 3,
            background: `linear-gradient(90deg, 
            transparent 0%, 
            ${theme.palette[color].main}60 50%, 
            transparent 100%
          )`,
            borderRadius: "2px 2px 0 0",
          }}
        />
      </CardContent>
    </Card>
  );
};
