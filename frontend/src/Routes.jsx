import React from "react";
import { Route, Routes } from "react-router-dom";

// Components
import NavBar from "./Components/NavBar";
// import Footer from "./Components/Footer";

// Pages
import Login from "./Pages/Account/Login";
import Logged from "./Pages/Account/Logged";
import NotFound from "./Pages/NotFound";
import Adm from "./Pages/Adm";
import Categories from "./Pages/Adm/Categories";
import Types from "./Pages/Adm/Types";
import Users from "./Pages/Adm/Users";
import Quiz from "./Pages/PagesQuiz/Quiz";
import Quizzes from "./Pages/PagesQuiz/Quizzes";
import ChoosedQuiz from "./Pages/PagesQuiz/Quizzes/ChoosedQuiz";
import MyChoosedQuiz from "./Pages/PagesQuiz/Quiz/MyChoosedQuiz";
import CreateQuiz from "./Pages/PagesQuiz/CreateQuiz";
import NewQuiz from "./Pages/PagesQuiz/Quiz/NewQuiz";

// Utilities
import PrivateRoutes from "./Utils/PrivateRoutes";
import SharedRoutes from "./Utils/SharedRoutes";

import { Box } from "@chakra-ui/react";

const routes = [
  {
    routeType: SharedRoutes,
    childrens: [
      { path: "/logged", element: <Logged /> },
      { path: "/studio", element: <Quiz /> },
      { path: "/studio/create/:tipoEscolhido", element: <NewQuiz /> },
      { path: "/meu-quiz-escolhido/:quiz_id", element: <MyChoosedQuiz /> },
    ],
  },
  {
    routeType: PrivateRoutes,
    childrens: [
      { path: "/adm", element: <Adm /> },
      { path: "/adm/types", element: <Types /> },
      { path: "/adm/categories", element: <Categories /> },
      { path: "/adm/users", element: <Users /> },
    ],
  },
];

export function Router() {
  return (
    <>
      <NavBar />
      <Box pt="10rem" id="espaco-nav" filter="auto" transition="all 0.3s">
        <Routes>
          {routes.map((route, i) => (
            <Route key={i} element={<route.routeType />}>
              {route.childrens.map((child, index) => (
                <Route key={index} path={child.path} element={child.element} />
              ))}
            </Route>
          ))}
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Login />} />
          <Route path="/discover" element={<Quizzes />} exact />
          <Route path="/discover/:quiz_id" element={<ChoosedQuiz />} />
          <Route path="/criar-quiz" element={<CreateQuiz />} />
        </Routes>
      </Box>
      {/* <Footer /> */}
    </>
  );
}
