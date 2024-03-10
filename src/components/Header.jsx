
// import flexImage from "./../img/flex.png";
import PORTALS from "../constants/portals";
import { usePortals } from "../hooks/usePortals";


function Header() {

  const { portals, setPortal } = usePortals();

  return (

    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">metricsapp</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse flex-grow-0" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Brandon Wright
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
              <li><a className="dropdown-item" href="#">Profile</a></li>
              <li><a className="dropdown-item" href="#">Documentation</a></li>
              <li><a className="dropdown-item" href="#">Data</a></li>
              <li><h6 className="dropdown-header">Pick your portal(s):</h6></li>
              {PORTALS.map((portal, index) => (
                <li key={index}> <div className="dropdown-item"><div className="form-check"><input defaultChecked={portals.some(p => p.name === portal.name)} onChange={(e) => setPortal({ name: e.target.value })} className="form-check-input" type="checkbox" id={`${portal.name}`} name="applications" value={`${portal.name}`} />
                  <label className="form-label" htmlFor={`${portal.name}`}>{portal.name}</label>
                </div></div>
                </li>
              ))}
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="#">Log out</a></li>
            </ul>
            </li>
          </ul>
          
        </div>
      </div>
    </nav>
  );
}

export default Header;