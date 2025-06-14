import "./App.css";
import viteLogo from "/vite.svg";
import { store } from "@slices/store";
import { Provider } from "react-redux";
import reactLogo from "./assets/react.svg";
import WeatherView from "@views/WeatherView";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={3} preventDuplicate>
        <WeatherView></WeatherView>
      </SnackbarProvider>
    </Provider>
  );
}

export default App;
