import "./App.css";
import { store } from "@slices/store";
import { Provider } from "react-redux";
import { UIMessages } from "@configs/types";
import WeatherView from "@views/WeatherView";
import { SnackbarProvider } from "notistack";
import { ErrorBoundary } from "@views/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary fallback={UIMessages.defaultError}>
      <Provider store={store}>
        <SnackbarProvider maxSnack={3} preventDuplicate>
          <WeatherView />
        </SnackbarProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
