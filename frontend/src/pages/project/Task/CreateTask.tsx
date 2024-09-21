import { useCreateTaskMutation } from "@/features/tasks/taskApi";
import { ITaskRequest } from "@/types";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAppSelector } from "@/app/hook";

const CreateTask = () => {
    const { projectId } = useParams()

    const { users } = useAppSelector((state) => state.user)

    const {
        register,
        control,
        handleSubmit,
        reset
    } = useForm<ITaskRequest>();


    const [createTask, { isLoading, isSuccess, error, isError, data }] =
        useCreateTaskMutation();

    const handleCreateTaskForm = (project: ITaskRequest) => {
        if(projectId) {
            project.project = projectId
            createTask(project);
        }
    };

    const navigate = useNavigate();


    useEffect(() => {
        if (isSuccess) {
            toast.dismiss("signup_user")
            toast.success((data as any)?.message as any);
            reset()
            navigate(-1);
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
        <div className="container mt80" style={{ margin: "auto" }}>
            <form className="form-style1" onSubmit={handleSubmit(handleCreateTaskForm)}>

                <div className="mb25">
                    <label htmlFor="title" className="form-label fw600 dark-color">Titre</label>
                    <input
                        id="title"
                        type="text"
                        className="form-control"
                        {...register('title', { required: true })}
                    />
                </div>
                {/* End Title */}

                <div className="mb25">
                    <label htmlFor="description" className="form-label fw600 dark-color">Description</label>
                    <input
                        id="description"
                        type="text"
                        className="form-control"
                        {...register('description', { required: true })}
                    />
                </div>
                {/* End Description */}

                <div className="mb25">
                    <label htmlFor="dueDate" className="form-label fw600 dark-color">Due Date</label>
                    <Controller
                        name="dueDate"
                        control={control}
                        rules={{ required: "Due date is required" }}
                        render={({ field: { onChange, value } }) => (
                            <DatePicker
                                id="dueDate"
                                selected={value}
                                onChange={(date) => onChange(date)}
                            />
                        )}
                    />
                </div>
                {/* End Due Date */}

                <div className="mb25">
                    <label className="form-label fw600 dark-color">Définissez votre un rôle</label>
                    <select className="form-control" {...register('status', { required: true })}>
                        <option value="Pending">En attente</option>
                        <option value="Progress">En cours</option>
                        <option value="Completed">Terminé</option>
                    </select>
                </div>

                <div className="mb25">
                    <label className="form-label fw600 dark-color">Assigner à:</label>
                    <select className="form-control mb-2" {...register('assignedTo', { required: true })}>
                        {users?.map((user) => (
                            <option key={user._id} value={user._id}>{user.name}</option>
                        ))}
                    </select>
                </div>

                <div className="mb25">
                    <label className="form-label fw600 dark-color">Priorité</label>
                    <select className="form-control mb-2" {...register('priority', { required: true })}>
                        <option value="low">Faible</option>
                        <option value="medium">Moyen</option>
                        <option value="high">Elevé</option>
                    </select>
                </div>


                {/* End Status */}

                <div className="d-grid mb20">
                    <button className="ud-btn btn-thm" type="submit">
                        Créer
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateTask