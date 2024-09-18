import Dashboard from "@/layouts/DashBoard";
import RequireUser from "@/components/RequireUser";
import dashboarRoutesList from "./dashboarRoutesList";
import Project from "@/pages/project";
import { CookiesProvider } from "react-cookie";


const dashboardRoutes = {
    path: "/",
    element: (
        <CookiesProvider>
            <RequireUser allowedRoles={['admin', 'member']}>
                <Dashboard />
            </RequireUser>
        </CookiesProvider>
    ),
    children: [
      {
        path: "/dashboard",
        element: <Project/>,
      },
  
      ...dashboarRoutesList.map((item) => {
        return {
          path: item.url,
          element: item.component,  
        };
      }),
    ],
  };

  export default dashboardRoutes