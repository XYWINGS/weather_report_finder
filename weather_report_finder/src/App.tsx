import "./App.css";
import viteLogo from "/vite.svg";
import { store } from "@slices/store";
import { Provider } from "react-redux";
import reactLogo from "./assets/react.svg";
import WeatherView from "@views/WeatherView";
import { SnackbarProvider } from "notistack";
import { ErrorBoundary } from "@views/ErrorBoundry";

function App() {
  return (
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
      <Provider store={store}>
        <SnackbarProvider maxSnack={3} preventDuplicate>
          <WeatherView />
        </SnackbarProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
