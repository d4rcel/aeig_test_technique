import { ITaskRequest } from "@/types";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useEditTaskMutation, useGetTaskQuery } from "@/features/tasks/taskApi";


const EditTask = () => {
  const { projectId, taskId } = useParams()
  const { data: taskData } = useGetTaskQuery(taskId!)

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    control
  } = useForm<ITaskRequest>();

  const [editTask, { isLoading, isSuccess, error, isError, data }] =
    useEditTaskMutation();

  const handleEditForm = (task: ITaskRequest) => {

    editTask({ id: taskData?.task._id as string, body: task });
  };


  useEffect(() => {
    if (isSuccess) {
      toast.dismiss("signup_user")
      toast.success((data as any)?.message as any);
      reset()
      navigate(`${'/view-project/'}${projectId}`);
    }

    if (isLoading) {
      toast.loading("Loading", { id: "signup_user" })
    }

    if (isError) {
      toast.dismiss("signup_user")
      if (Array.isArray((error as any).data.error)) {
        (error as any).data.error.forEach((el: any) =>
          toast.error(el.message)
        );
      } else {
        toast.error((error as any).data.message);
      }
    }
  }, [isLoading]);

  return (
    <div className="container" style={{ margin: "auto" }}>
      {taskData && <form className="form-style1" onSubmit={handleSubmit(handleEditForm)}>
        <div className="row">
          <div className="col-md-6 mb25">
            <label htmlFor="name" className="form-label fw600 dark-color">Nom</label>
            <input
              id="name"
              type="text"
              className="form-control"
              defaultValue={taskData.task.title}
              {...register('title')}
            />
          </div>

          <div className="col-md-6 mb25">
            <label htmlFor="description" className="form-label fw600 dark-color">Description</label>
            <input
              id="description"
              type="text"
              className="form-control"
              defaultValue={taskData.task.description}
              {...register('description')}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb25">
            <label className="form-label fw600 dark-color">Date</label>
            <Controller
              name="dueDate"
              control={control}
              defaultValue={taskData.task.dueDate}
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  id="dueDate"
                  selected={value}
                  onChange={(date) => onChange(date)}
                />
              )}
            />
          </div>

          <div className="col-md-6 mb20">
            <label htmlFor="password" className="form-label fw600 dark-color">Statut</label>
            <select defaultValue={taskData.task.status} className="form-control" {...register('status')}>
              <option value="pending">En attente</option>
              <option value="progress">En cours</option>
              <option value="completed">Terminé</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb20">
            <label htmlFor="priority" className="form-label fw600 dark-color">Statut</label>
            <select id="priority" defaultValue={taskData.task.priority} className="form-control" {...register('priority')}>
              <option value="low">Faible</option>
              <option value="medium">Moyen</option>
              <option value="high">Elevé</option>
            </select>
          </div>
        </div>
        {/* End Role and Password */}

        <div className="d-grid mb20">
          <button className="ud-btn btn-thm" type="submit">
            Valider
          </button>
        </div>
      </form>}
    </div>


  )
}

export default EditTask