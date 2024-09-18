import Chat from "@/pages/chat";
import CreateProject from "@/pages/project/CreateProject";
import EditProject from "@/pages/project/EditProject";
import ViewProject from "@/pages/project/ViewProject";

export default [
    {
        title: "Communication",
        url: "/communication",
        component: <Chat />
    },
    {
        title: "Créer un projet",
        url: "/create-project",
        component: <CreateProject />
    },
    {
        title: "Editer un projet",
        url: "/edit-project",
        component: <EditProject />
    },
    {
        title: "Voir un projet",
        url: "/view-project",
        component: <ViewProject />
    }
];