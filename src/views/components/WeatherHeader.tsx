import {
  Box,
  Paper,
  AppBar,
  Toolbar,
  useTheme,
  Container,
  TextField,
  IconButton,
  Typography,
  Autocomplete,
  useMediaQuery,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Search, Menu } from "@mui/icons-material";
import { fetchWeather } from "@slices/weatherSlice";
import { fetchLocation } from "@slices/locationSlice";
import { useAppDispatch, useAppSelector } from "@slices/store";
import { RequestState, type CitySuggestion } from "@configs/types";

interface WeatherHeaderProps {
  onMenuClick?: () => void;
}

const WeatherHeader: React.FC<WeatherHeaderProps> = ({ onMenuClick }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const suggestedCity = useAppSelector((state) => state.location.locationSuggestion);
  const suggestedCityLoadingSate = useAppSelector((state) => state.location.state);
  const loadingSuggestions = suggestedCityLoadingSate === RequestState.LOADING;

  // Trigger fetch on typing
  useEffect(() => {
    if (searchQuery && searchQuery.length > 2) {
      dispatch(fetchLocation(searchQuery));
    }
  }, [searchQuery]);

  return (
    <AppBar
      position="sticky"
      elevation={5}
      sx={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.2)",
        color: "white",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          sx={{
            minHeight: { xs: 64, sm: 70, md: 80 },
            px: { xs: 1, sm: 2 },
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "stretch", md: "center" },
            gap: { xs: 2, md: 3, lg: 20 },
            py: { xs: 2, md: 0 },
          }}
        >
          {/* Top row on mobile: Menu + Logo */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: { xs: "100%", md: "auto" },
              mb: { xs: 1, md: 0 },
            }}
          >
            {/* Menu Button - Mobile Only */}
            {isMobile && onMenuClick && (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={onMenuClick}
                sx={{
                  mr: 1,
                  color: "rgba(255,255,255,0.9)",
                }}
              >
                <Menu />
              </IconButton>
            )}

            {/* App Logo/Title */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: 1, sm: 1.5, md: 2 },
                flexGrow: { xs: 1, md: 0 },
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              <Box
                component="img"
                src="/icon.svg"
                alt="Rain Or Shine Weather App"
                sx={{
                  width: { xs: 32, sm: 36, md: 40 },
                  height: { xs: 32, sm: 36, md: 40 },
                  filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.2))",
                  transition: "transform 0.2s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              />
              <Typography
                variant={isSmallMobile ? "h5" : isMobile ? "h4" : "h3"}
                component="h1"
                sx={{
                  fontWeight: 700,
                  background: "linear-gradient(45deg, #ffffff 30%, #e3f2fd 70%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: "-0.02em",
                  textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  display: { xs: "block" },
                }}
              >
                Rain Or Shine
              </Typography>
            </Box>
          </Box>

          {/* Search Section */}
          <Box
            sx={{
              flex: { md: 1 },
              maxWidth: { xs: "100%", md: 500, lg: 600 },
              width: "100%",
            }}
          >
            <Autocomplete
              open={open}
              onOpen={() => {
                if (searchQuery.trim() !== "") {
                  setOpen(true);
                }
              }}
              onClose={() => setOpen(false)}
              loading={loadingSuggestions}
              options={Array.isArray(suggestedCity) ? suggestedCity : []}
              getOptionLabel={(option: CitySuggestion) => `${option.name}, ${option.region}, ${option.country}`}
              inputValue={searchQuery}
              onInputChange={(_, newInputValue, reason) => {
                if (reason !== "reset") {
                  setSearchQuery(newInputValue);
                  setOpen(newInputValue.trim() !== "");
                }
              }}
              onChange={(_, selectedOption) => {
                if (selectedOption) {
                  dispatch(fetchWeather(selectedOption.name));
                  setSearchQuery("");
                  setOpen(false);
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size={isMobile ? "small" : "medium"}
                  fullWidth
                  variant="outlined"
                  placeholder={isMobile ? "Search city..." : "Enter city name or location..."}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <>
                        <InputAdornment position="start">
                          <Search
                            sx={{
                              color: "rgba(0,0,0,0.6)",
                              fontSize: isMobile ? "1.2rem" : "1.5rem",
                            }}
                          />
                        </InputAdornment>
                        {params.InputProps.startAdornment}
                      </>
                    ),
                    endAdornment: (
                      <>
                        {loadingSuggestions ? (
                          <CircularProgress size={isMobile ? 18 : 22} sx={{ color: "primary.main" }} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: "rgba(255,255,255,0.95)",
                      backdropFilter: "blur(10px)",
                      borderRadius: { xs: 2, sm: 3 },
                      fontSize: { xs: "0.95rem", sm: "1rem", md: "1.1rem" },
                      minHeight: { xs: 40, sm: 48, md: 56 },
                      border: "1px solid rgba(255,255,255,0.3)",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        bgcolor: "rgba(255,255,255,1)",
                        boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                        transform: "translateY(-1px)",
                      },
                      "&.Mui-focused": {
                        bgcolor: "rgba(255,255,255,1)",
                        border: "1px solid rgba(25,118,210,0.8)",
                        boxShadow: "0 6px 20px rgba(25,118,210,0.2)",
                        transform: "translateY(-1px)",
                      },
                      "& fieldset": {
                        border: "none",
                      },
                    },
                    "& .MuiInputBase-input": {
                      color: "rgba(0,0,0,0.87)",
                      fontWeight: 500,
                      py: { xs: 1, sm: 1.5 },
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
                    mt: 0.5,
                    borderRadius: 2,
                    boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    backdropFilter: "blur(20px)",
                    bgcolor: "rgba(255,255,255,0.95)",
                    maxHeight: { xs: 200, sm: 300 },
                    "& .MuiAutocomplete-option": {
                      fontSize: { xs: "0.9rem", sm: "1rem" },
                      py: { xs: 1, sm: 1.5 },
                    },
                  }}
                />
              )}
              componentsProps={{
                popper: {
                  style: {
                    zIndex: theme.zIndex.modal + 1,
                  },
                },
              }}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default WeatherHeader;
