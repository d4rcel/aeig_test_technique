import Main from "@/layouts/Main";
import mainRoutesList from "./mainRoutesList";
import Home from "@/pages/home";
import { CookiesProvider } from 'react-cookie';

const mainRoutes = {
    path: "/",
    element: (
        <CookiesProvider>
            <Main />
        </CookiesProvider>
    ),
    children: [
      {
        path: "/",
        element: <Home/>,
      },
  
      ...mainRoutesList.map((item) => {
        return {
          path: item.url,
          element: item.component,
  
        };
      }),
    ],
  };

  export default mainRoutes