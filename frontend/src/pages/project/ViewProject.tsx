import { useAppDispatch, useAppSelector } from "@/app/hook"
import ChatScreen from "@/components/ChatScreen"
import Task from "@/components/Task"
import { useGetAllTasksQuery, useDeleteTaskMutation } from "@/features/tasks/taskApi"
import { useGetProjectQuery } from "@/features/project/projectApi"
import { useEffect } from "react"
import { toast } from "react-hot-toast"
import { Link, useParams } from "react-router-dom"
import { getFormatedDate, getStatusStyle } from '@/utils/formater'
import { userApi } from "@/features/user/userApi"

const ViewProject = () => {
  const { projectId } = useParams()
  const { tasks } = useAppSelector((state) => state.tasks)
  const dispatch = useAppDispatch()

  const [ deleteTask, {isSuccess: isDeleteSuccess} ] = useDeleteTaskMutation();
  const {data: projectData} = useGetProjectQuery(projectId!)
  const {isLoading, isSuccess, isError, error, data } = useGetAllTasksQuery(projectId!);

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
  };

  const { isLoading: loadingUser } = userApi.endpoints.getUsers.useQuery(null, {
    skip: false,
    refetchOnMountOrArgChange: true,
  });


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
          {projectData?.project && <div>
            <h2 className="fw-bold">{projectData.project.title}</h2>
            <p className="text-muted">
              {projectData.project.description}
            </p>
            <div className="d-flex justify-content-between mb-3">
              <span className={`${getStatusStyle(projectData.project.status!)}`} >Status: {projectData.project.status}</span>
              <span className="text-muted">Date de fin: {getFormatedDate(projectData.project?.dueDate.toString()!)}</span>
            </div>

            {/* Button to add a new task */}
            <Link to={`/create-task/${projectData.project._id}`} className="btn btn-primary mb-3" >Ajouter une tache</Link>
          </div>}

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