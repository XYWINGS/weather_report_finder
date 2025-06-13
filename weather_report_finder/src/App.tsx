import "./App.css";
import viteLogo from "/vite.svg";
import reactLogo from "./assets/react.svg";
import WeatherView from "@views/WeatherView";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <SnackbarProvider maxSnack={3} preventDuplicate>
      <WeatherView></WeatherView>
    </SnackbarProvider>
  );
}

export default App;
