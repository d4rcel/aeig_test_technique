import About from "@/pages/about";
import Register from "@/pages/register";
import Login from "@/pages/login";

export default [
    {
        title: "A propos",
        url: "/about",
        component: <About />
    },
    {
        title: "Gallery",
        url: "/register",
        component: <Register/>,
    },
    {
        title: "Artiste",
        url: "/login",
        component: <Login/>,
    }
];