import {
  Box,
  Paper,
  Divider,
  useTheme,
  TextField,
  Container,
  Typography,
  Autocomplete,
  useMediaQuery,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import { Search } from "@mui/icons-material";
import type { CitySuggestion } from "@configs/types";

interface WeatherHeaderProps {
  setSearchQuery: (query: string) => void;
  suggestedCity: CitySuggestion[];
  loadingSuggestions: boolean;
  onCitySelect: (cityName: string) => void;
}

const WeatherHeader: React.FC<WeatherHeaderProps> = ({
  setSearchQuery,
  suggestedCity,
  loadingSuggestions,
  onCitySelect,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);

  return (
    <Box
      component="header"
      sx={{
        position: "relative",
        mb: { xs: 4, sm: 6 },
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
          backdropFilter: "blur(20px)",
          borderRadius: { xs: 0, sm: 3 },
          border: "1px solid rgba(255,255,255,0.2)",
          zIndex: -1,
        },
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{
            background: "transparent",
            py: { xs: 3, sm: 4, md: 5 },
            px: { xs: 2, sm: 3, md: 4 },
            borderRadius: { xs: 0, sm: 3 },
          }}
        >
          {/* App Branding Section */}
          <Box textAlign="center" mb={{ xs: 4, sm: 5 }}>
            <Typography
              variant={isMobile ? "h3" : "h2"}
              component="h1"
              fontWeight={800}
              sx={{
                background: "linear-gradient(45deg, #ffffff 30%, #e3f2fd 70%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "none",
                mb: { xs: 1, sm: 2 },
                letterSpacing: "-0.02em",
                fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" },
              }}
            >
              Rain Or Shine
            </Typography>

            <Typography
              variant={isMobile ? "subtitle1" : "h6"}
              color="rgba(255,255,255,0.85)"
              sx={{
                textShadow: "1px 1px 3px rgba(0,0,0,0.4)",
                px: { xs: 2, sm: 0 },
                fontWeight: 300,
                letterSpacing: "0.5px",
                maxWidth: 500,
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              Your trusted companion for real-time weather insights and
              forecasts
            </Typography>
          </Box>

          {/* Decorative Divider */}
          <Divider
            sx={{
              mb: { xs: 3, sm: 4 },
              "&::before, &::after": {
                borderColor: "rgba(255,255,255,0.3)",
              },
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid rgba(255,255,255,0.3)",
              }}
            >
              <Search sx={{ color: "rgba(255,255,255,0.7)", fontSize: 20 }} />
            </Box>
          </Divider>

          {/* Enhanced Search Section */}
          <Box
            sx={{
              maxWidth: 650,
              mx: "auto",
              position: "relative",
            }}
          >
            <Typography
              variant="subtitle2"
              color="rgba(255,255,255,0.8)"
              sx={{
                mb: 2,
                textAlign: "center",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "1px",
                fontSize: "0.75rem",
              }}
            >
              Discover Weather Anywhere
            </Typography>

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
              onChange={(_, selectedOption) => {
                if (selectedOption) {
                  onCitySelect(selectedOption.name);
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  variant="outlined"
                  placeholder="Enter city name or location..."
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <>
                        <InputAdornment position="start">
                          <Search sx={{ color: "rgba(0,0,0,0.6)" }} />
                        </InputAdornment>
                        {params.InputProps.startAdornment}
                      </>
                    ),
                    endAdornment: (
                      <>
                        {loadingSuggestions ? (
                          <CircularProgress
                            size={22}
                            sx={{ color: "primary.main" }}
                          />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: "rgba(255,255,255,0.98)",
                      backdropFilter: "blur(15px)",
                      borderRadius: 3,
                      fontSize: "1.1rem",
                      py: 0.5,
                      border: "2px solid transparent",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        bgcolor: "rgba(255,255,255,1)",
                        boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                        transform: "translateY(-2px)",
                      },
                      "&.Mui-focused": {
                        bgcolor: "rgba(255,255,255,1)",
                        border: "2px solid rgba(25,118,210,0.5)",
                        boxShadow: "0 12px 40px rgba(25,118,210,0.2)",
                        transform: "translateY(-2px)",
                      },
                      "& fieldset": {
                        border: "none",
                      },
                    },
                    "& .MuiInputBase-input": {
                      color: "rgba(0,0,0,0.87)",
                      fontWeight: 500,
                      "&::placeholder": {
                        color: "rgba(0,0,0,0.5)",
                        opacity: 1,
                        fontWeight: 400,
                      },
                    },
                  }}
                />
              )}
              PaperComponent={(props) => (
                <Paper
                  {...props}
                  sx={{
                    mt: 1,
                    borderRadius: 2,
                    boxShadow: "0 16px 48px rgba(0,0,0,0.2)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    backdropFilter: "blur(20px)",
                    bgcolor: "rgba(255,255,255,0.95)",
                  }}
                />
              )}
            />
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default WeatherHeader;
