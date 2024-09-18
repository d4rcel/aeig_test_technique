import { useAppSelector } from "@/app/hook"
import ChatScreen from "@/components/ChatScreen"
import Task from "@/components/Task"
import { useGetAllTasksQuery, useGetUsersQuery, useDeleteTaskMutation } from "@/features/tasks/taskApi"
import { useEffect } from "react"
import { toast } from "react-hot-toast"
import { useLocation, useNavigate } from "react-router-dom"
import { getFormatedDate, getStatusStyle } from '@/utils/formater'

const ViewProject = () => {

  const location = useLocation()
  // const navigate = useNavigate();

  const project = location.state

  // const { user } = useAppSelector((state) => state.user)

  const { tasks } = useAppSelector((state) => state.tasks)
  const { isLoading, isSuccess, isError, error, data } = useGetAllTasksQuery(undefined);

  // const { isLoading: loadingUsers, data: users } = useGetUsersQuery(undefined);

  const [deleteTask, { isLoading: deleting }] = useDeleteTaskMutation();

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
  };

  useEffect(() => {
    if (!tasks) {
      if (isSuccess) {
        toast.dismiss("signup_user")
        toast.success(data?.message as any);
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
          <button className="btn btn-primary mb-3" >Ajouter une tache</button>

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