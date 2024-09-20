import Chat from "@/pages/chat";
import CreateProject from "@/pages/project/CreateProject";
import EditProject from "@/pages/project/EditProject";
import CreateTask from "@/pages/project/Task/CreateTask";
import EditTask from "@/pages/project/Task/EditTask";
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
        url: "/edit-project/:projectId",
        component: <EditProject />
    },
    {
        title: "Voir un projet",
        url: "/view-project/:projectId",
        component: <ViewProject />
    },
    {
        title: "Editer une tache",
        url: "/create-task/:projectId",
        component: <CreateTask />
    },
    {
        title: "Editer une tache",
        url: "/edit-task/:projectId/:taskId",
        component: <EditTask />
    }
];