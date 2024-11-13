import App from "./App";
import { loader } from "./loaders/LondonLoader";
import HomePage from "./routes/HomeRoute";
import MapPage from "./routes/MapRoute";

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
                loader: loader,
            },
        ]
    }
];

export default routes;