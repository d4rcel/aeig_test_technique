import { Link } from "react-router-dom"

const Header = () => {
    return (
        <div>
            <div className="container">
                <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                    <a href="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none fz30" style={{fontWeight: "bold"}}>
                        Tiny Maestro
                        {/* <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"></use></svg> */}
                    </a>

                    <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                        <li><Link to="/" className="nav-link px-2 link-secondary auHover">Accueil</Link></li>
                        <li><Link to="about" className="nav-link px-2 link-dark auHover">A propos</Link></li>
                    </ul>

                    <div className="col-md-3 text-end">
                        <Link to="/login" type="button" className="btn btn-outline-primary me-2">Se connecter</Link>
                        <Link to="/register" type="button" className="btn btn-primary">S'inscrire</Link>
                    </div>
                </header>
            </div>
        </div>
    )
}

export default Header