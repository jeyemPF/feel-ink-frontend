import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import AppProvider from "./context/AppContext";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ErrorBoundary>
    <AppProvider>
      <App />
    </AppProvider>
  </ErrorBoundary>
);
