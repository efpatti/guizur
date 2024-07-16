import React from "react";
import { Route, Routes } from "react-router-dom";

// Components
import NavBar from "./Components/NavBar";
// import Footer from "./Components/Footer";

// Pages
import Login from "./Pages/Account/Login";
import Logado from "./Pages/Account/Logged";
import NotFound from "./Pages/NotFound";
import Adm from "./Pages/Adm";
import Users from "./Pages/Users";
import Quiz from "./Pages/Quiz";
import Quizzes from "./Pages/Quizzes";
import QuizEscolhido from "./Pages/Quizzes/QuizEscolhido";

// Utilities
import PrivateRoutes from "./Utils/PrivateRoutes";
import SharedRoutes from "./Utils/SharedRoutes";

import { Box } from "@chakra-ui/react";

const routes = [
  {
    routeType: SharedRoutes,
    childrens: [
      { path: "/logado", element: <Logado /> },
      { path: "/criar-quiz", element: <Quiz /> },
    ],
  },
  {
    routeType: PrivateRoutes,
    childrens: [
      { path: "/adm", element: <Adm /> },
      { path: "/usuarios", element: <Users /> },
    ],
  },
];

export function Router() {
  return (
    <>
      <NavBar />
      <Box mt="64px" id="espaco-nav" filter="auto" transition="all 0.3s">
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
          <Route path="/discover/:quiz_id" element={<QuizEscolhido />} />
        </Routes>
      </Box>
      {/* <Footer /> */}
    </>
  );
}
