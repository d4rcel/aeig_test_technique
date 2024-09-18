import { useAppSelector } from "@/app/hook"
import { Link } from "react-router-dom"
import { useGetAllProjectsQuery, useDeleteProjectMutation } from "@/features/project/projectApi";
import { toast } from "react-hot-toast";

const getStatusStyle = (status: string) => {
  switch (status) {
    case "pending":
      return "pending-style style1";
    case "Progress":
      return "pending-style style2";
    case "Completed":
      return "pending-style style3";
    default:
      return "";
  }
};

const Project = () => {
  const { projects } = useAppSelector((state) => state.projects)

  const { isLoading } = useGetAllProjectsQuery(undefined);

  const [deleteProject, { isLoading: deleting, error}] =
  useDeleteProjectMutation();

  console.log("WASABI ::: ", projects);

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
                  <h5 className="card-header">{project.title}</h5>
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