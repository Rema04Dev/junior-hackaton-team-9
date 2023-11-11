import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Game from "./components/Game";
import { Provider } from "react-redux";
import store from "./slices/index.js";
import StartPage from "./components/StartPage.jsx";
import { appRoutes } from "./appRoutes.js";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { AppLayout } from "./AppLayout.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={appRoutes.home} element={<AppLayout />}>
            <Route path={appRoutes.home} element={<StartPage />}/>
            <Route path={appRoutes.game} element={<Game />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
