import { BrowserRouter } from "react-router-dom";
import { Router } from "./Routes";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./Hooks/useAuth";
import { QuizProvider } from "./Pages/PagesQuiz/Quizzes/QuizContext";

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <QuizProvider>
          <Router />
        </QuizProvider>
      </AuthProvider>
      <ToastContainer />
    </BrowserRouter>
  );
}
