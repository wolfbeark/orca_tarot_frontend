/* eslint-disable */

import App from "App";
import { createBrowserRouter } from "react-router-dom";
import Error404 from "screen/Error404";
import Home from "screen/Home";
import Login from "screen/Login";
import Manual from "screen/Manual";

import Spread from "screen/Spread";
import SingleSpread from 'screen/spread_child/SingleSpread'
import MultiSpread from "screen/spread_child/MultiSpread";
import CreateSpread from "screen/spread_child/CreateSpread";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <Home />,
                children:[
                    {
                        path: 'manual',
                        element: <Manual />
                    }
                ]
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'spread',
                element: <Spread />,
                children: [
                    {
                        path: 'single',
                        element: <SingleSpread />
                    },
                    {
                        path: 'multi',
                        element: <MultiSpread />
                    }
                    ,{
                        path: 'create',
                        element: <CreateSpread />
                    },
                ]
            }
        ],
        errorElement: <Error404 />
    }
],{
    basename: `${process.env.PUBLIC_URL}`
});

export default router;