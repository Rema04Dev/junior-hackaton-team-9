import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Game from './components/Game';
import reportWebVitals from './reportWebVitals';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './slices/index.js';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
    },
    {
        path: "/game",
        element: <Game />,
    },
    {
        path: "/game_completed",
        //element: GameCompleted
    },
    {
        path: "/leaderboard",
        //element: LeaderBoard
    },
    {
        path: "/stats",
        //element: Stats
    },
    {
        path: "/share",
        //element: Share
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
