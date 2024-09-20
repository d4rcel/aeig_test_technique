import { Link } from "react-router-dom"
import {getFormatedDate, getStatusStyle} from '@/utils/formater'
import { ITaskResponse } from "@/types"


const Task = ({ task, onDelete } : {
    task : ITaskResponse, 
    onDelete: (taskId: string) => void
}) => {

return (
<div className="card mb-3">
    <div className="card-body">

    <div>
        <h5 className="card-title">{task.title}</h5>
        <p className="card-text">{task.description}</p>
    </div>

    <div className="d-flex justify-content-between">
        <span className={`${getStatusStyle(task.status)}`}>{task.status}</span>
        <span className="text-muted">Date de fin: {getFormatedDate(task.dueDate.toString())}</span>
    </div>

    <div className="mt-3">
       
        <Link to={`/edit-task/${task.project}/${task._id}`} className="btn btn-warning me-2" >
            Editer
        </Link>
        <button className="btn btn-danger" onClick={() => onDelete(task._id)}>Delete</button>
    </div>
    </div>
</div>
)}

export default Task