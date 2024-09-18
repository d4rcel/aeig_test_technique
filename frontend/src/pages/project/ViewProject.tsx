import { useAppSelector } from "@/app/hook"
import ChatScreen from "@/components/ChatScreen"
import Task from "@/components/Task"
import { useGetAllTasksMutation, useDeleteTaskMutation } from "@/features/tasks/taskApi"
import { useEffect } from "react"
import { toast } from "react-hot-toast"
import { Link, useLocation } from "react-router-dom"
import { getFormatedDate, getStatusStyle } from '@/utils/formater'
import { userApi } from "@/features/user/userApi"

const ViewProject = () => {

  const location = useLocation()

  const project = location.state

  // const { user } = useAppSelector((state) => state.user)

  const { tasks } = useAppSelector((state) => state.tasks)
  const [getTasks, {isLoading, isSuccess, isError, error, data }] = useGetAllTasksMutation(undefined);

  const [deleteTask, { isLoading: deleting }] = useDeleteTaskMutation();

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
  };

  const { isLoading: loadingUser } = userApi.endpoints.getUsers.useQuery(null, {
    skip: false,
    refetchOnMountOrArgChange: true,
  });

  const users = userApi.endpoints.getUsers.useQueryState(null, {
    selectFromResult: ({ data }) => data!,
  });

  useEffect(() => {
    
    getTasks({project: project._id})
  }, [])

  useEffect(() => {

    if (!tasks) {
      if (isSuccess) {
        toast.dismiss("signup_user")
        toast.success((data as any)?.message as any);
        // navigate(-1);
      }

      if (isLoading) {
        toast.loading("Loading", { id: "signup_user" })
      }

      if (isError) {
        toast.dismiss("signup_user")
        if (Array.isArray((error as any).data.error)) {
          (error as any).data.error.forEach((el: any) =>
            toast.error(el.message, {
              position: 'top-right',
            })
          );
        } else {
          toast.error((error as any).data.message, {
            position: 'top-right',
          });
        }
      }
    }
  }, [isLoading]);

  return (
    <div className="container-fluid">
      <div className="row">
        {/* First part - 75% width */}
        <div className="col-md-9 p-3">
          <h2 className="fw-bold">{project.title}</h2>
          <p className="text-muted">
            {project.description}
          </p>
          <div className="d-flex justify-content-between mb-3">
            <span className={`${getStatusStyle(project.status)}`} >Status: {project.status}</span>
            <span className="text-muted">Date de fin: {getFormatedDate(project.dueDate)}</span>
          </div>

          {/* Button to add a new task */}
          <Link state={users} to="/create-task" className="btn btn-primary mb-3" >Ajouter une tache</Link>

          {/* List of To-Do Cards */}
          {tasks && tasks.map(task => (
            <Task
              key={task._id}
              task={task}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>

        {/* Second part - 25% width - Chat */}
        <ChatScreen />
      </div>
    </div>
  )
}

export default ViewProject