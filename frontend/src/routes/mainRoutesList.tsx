import About from "@/pages/about";
import Register from "@/pages/register";
import Login from "@/pages/login";
import Unauthorized from "@/pages/unauthorize";
import Error404 from "@/components/common/Error404";

export default [
    {
        title: "A propos",
        url: "/about",
        component: <About />
    },
    {
        title: "Register",
        url: "/register",
        component: <Register/>,
    },
    {
        title: "Login",
        url: "/login",
        component: <Login/>,
    },
    {
        title: "Unauthorized",
        url: "/unauthorized",
        component: <Unauthorized/>,
    },{
        title: "Page not found",
        url: "*",
        component: <Error404/>,
    }

];