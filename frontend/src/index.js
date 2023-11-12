import React from "react";
import ReactDOM from "react-dom/client";
import Game from "./components/Game";
import { Provider } from "react-redux";
import store from "./slices/index.js";
import StartPage from "./components/StartPage.jsx";
import { appRoutes } from "./appRoutes.js";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { AppLayout } from "./AppLayout.js";
import { Result } from "./components/Result.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={appRoutes.home} element={<AppLayout />}>
            <Route path={appRoutes.home} element={<StartPage />}/>
            <Route path={appRoutes.game} element={<Game />}/>
            <Route path={appRoutes.result} element={<Result />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
