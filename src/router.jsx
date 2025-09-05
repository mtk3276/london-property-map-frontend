import App from "./App";
import HomePage from "./routes/HomeRoute";
import MapPage from "./routes/MapRoute";
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
        ],
    },
    {
        path: "/app2",
        element: <App2 />,
    }
];

export default routes;