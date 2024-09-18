import { useAppSelector } from "@/app/hook"
import { Link } from "react-router-dom"
import { useGetAllProjectsQuery, useDeleteProjectMutation } from "@/features/project/projectApi";
import {getStatusStyle} from '@/utils/formater'



const Project = () => {
  const { projects } = useAppSelector((state) => state.projects)

  const { isLoading } = useGetAllProjectsQuery(undefined);

  const [deleteProject] =
  useDeleteProjectMutation();

  const onDeleteHandler = (id: string) => {
    if (window.confirm('Ete vous sur ?')) {
      deleteProject(id);
    }
  };
  
  return (
    <div className="container">
      {isLoading && <div>CHARGEMENT...</div>}
      {(!projects || projects?.length === 0) && <Link to="/create-project" className="fz20 centered-element">
        Créer un projet maintenant
      </Link>}

      <div className="row">
        {projects && <div className="row row-cols-1 row-cols-md-3 g-4">
            {projects.map((project, index) => (
              <div className="col" key={index}>
                <div className="card">
                  <Link to="/view-project" state={project} className="card-header">{project.title}</Link>
                  <div className={`ml-8 card-subtitle mt-2 ${getStatusStyle(project.status)}`} >{project.status}</div>
                  <div className="card-body">
                    <p className="card-text">{project.description}</p>
                    <Link to="/edit-project" className="btn btn-primary mr-4" data-mdb-ripple-init state={project} style={{color: "#fff"}}>Editer</Link>
                    <div onClick={() => onDeleteHandler(project._id)} className="btn btn-danger" data-mdb-ripple-init style={{color: "#fff", marginLeft: "10px"}}>Supprimer</div>
                  </div>
                </div>
              </div>
            ) )}
        </div>}
      </div>
      
    </div>
  )
}

export default Project