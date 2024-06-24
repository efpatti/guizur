import { BrowserRouter } from "react-router-dom";
import { Router } from "./Routes";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./Hooks/useAuth";

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Router />
      </AuthProvider>
      <ToastContainer />
    </BrowserRouter>
  );
}
