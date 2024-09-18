import { Link } from "react-router-dom"
import { useAppSelector } from "@/app/hook"

const Header = () => {
    const { user } = useAppSelector((state) => state.user)

    return (
        <div>
            <div className="container">
                <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                    <a href="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none fz30" style={{ fontWeight: "bold" }}>
                        Tiny Maestro
                        {/* <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"></use></svg> */}
                    </a>

                    <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                        <li><Link to="/" className="nav-link px-2 link-secondary">Accueil</Link></li>
                        <li><Link to="about" className="nav-link px-2 link-dark">A propos</Link></li>
                    </ul>

                    {!user && <div className="col-md-3 text-end">
                        <Link to="/login" type="button" className="btn btn-outline-primary me-2 auHover">Se connecter</Link>
                        <Link to="/register" type="button" className="btn btn-primary auHover">S'inscrire</Link>
                    </div>}

                    {user && <div className="col-md-3 text-end">
                        <Link to="/login" type="button" className="btn btn-outline-primary me-2 auHover">Se déconnecter</Link>
                    </div>}
                </header>
            </div>
        </div>
    )
}

export default Header