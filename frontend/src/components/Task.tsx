import { Link } from "react-router-dom"
import {getFormatedDate} from '@/utils/formater'


const Task = ({ task, onDelete }) => {

return (
<div className="card mb-3">
    <div className="card-body">

    <div>
        <h5 className="card-title">{task.title}</h5>
        <p className="card-text">{task.description}</p>
    </div>

    <div className="d-flex justify-content-between">
        <span className="badge bg-primary">{task.status}</span>
        <span className="text-muted">Date de fin: {getFormatedDate(task.dueDate)}</span>
    </div>

    <div className="mt-3">
        {/* Dropdown to assign user */}
        {/* <select className="form-select mb-2" onChange={(e) => onAssign(task.id, e.target.value)}>
        <option value="">Assigner à:</option>
        {users.map((user) => (
            <option key={user.id} value={user.id}>{user.name}</option>
        ))}
        </select> */}

        {/* Buttons for edit, delete */}
        <Link to="/edit-task" className="btn btn-warning me-2" >
            Editer
        </Link>
        <button className="btn btn-danger" onClick={() => onDelete(task._id)}>Delete</button>
    </div>
    </div>
</div>
)}

export default Task