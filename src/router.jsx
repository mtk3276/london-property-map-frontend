import App from "./App";
import HomePage from "./routes/HomeRoute";
import MapPage from "./routes/MapRoute";
import AboutPage from "./routes/AboutRoute";
import App2 from "./App2";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "/map",
                element: <MapPage />,
            },
            {
                path: "/about",
                element: <AboutPage />,
            },
        ],
    },
    {
        path: "/app2",
        element: <App2 />,
    }
];

export default routes;