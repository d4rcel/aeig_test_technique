import { useEditProjectMutation } from "@/features/project/projectApi";
import { IProjectRequest } from "@/types";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const EditTaskt = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const stateProject = location.state;

  

  const id:string = stateProject._id
  const {
    register,
    handleSubmit,
    reset,
    control
  } = useForm<IProjectRequest>();

  const [editProject, { isLoading, isSuccess, error, isError, data }] =
    useEditProjectMutation();

  const handleEditForm = (project: IProjectRequest) => {
    
    editProject({ id , body:project });
  };


  useEffect(() => {
    if (isSuccess) {
      toast.dismiss("signup_user")
      toast.success((data as any)?.message as any);
      reset()
      navigate('/dashboard');
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
  }, [isLoading]);

  return (
    <div className="container" style={{ margin: "auto" }}>
      <form className="form-style1" onSubmit={handleSubmit(handleEditForm)}>
        <div className="row">
          <div className="col-md-6 mb25">
            <label htmlFor="name" className="form-label fw600 dark-color">Nom</label>
            <input
              id="name"
              type="text"
              className="form-control"
              defaultValue={stateProject.title}
              {...register('title')}
            />
          </div>

          <div className="col-md-6 mb25">
            <label htmlFor="description" className="form-label fw600 dark-color">Description</label>
            <input
              id="description"
              type="text"
              className="form-control"
              defaultValue={stateProject.description}
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
                defaultValue={stateProject.dueDate}
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
              <select defaultValue={stateProject.status} className="form-control" {...register('status')}>
                <option value="pending">En attente</option>
                <option value="progress">En cours</option>
                <option value="completed">Terminé</option>
            </select>
          </div>
        </div>
        {/* End Role and Password */}

        <div className="d-grid mb20">
          <button className="ud-btn btn-thm" type="submit">
            Valider
          </button>
        </div>
      </form>
    </div>


  )
}

export default EditTaskt