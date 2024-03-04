
// import flexImage from "./../img/flex.png";
import PORTALS from "../constants/portals";
import { usePortals } from "../hooks/usePortals";


function Header() {

  const { portals, setPortal } = usePortals();

  return (

    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a class="navbar-brand" href="#">metricsapp</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
        </div>
        <ul class="d-flex navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
              </svg><span className="visually-hidden">menu</span>
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><a class="dropdown-item" href="#">Profile</a></li>
              <li><a class="dropdown-item" href="#">Documentation</a></li>
              <li><a class="dropdown-item" href="#">Data</a></li>
              <li><h6 class="dropdown-header">Pick your portal(s):</h6></li>
              {PORTALS.map((portal, index) => (
                <li key={index}> <div class="dropdown-item"><div class="form-check"><input defaultChecked={portals.some(p => p.name === portal.name)} onChange={(e) => setPortal({ name: e.target.value })} className="form-check-input" type="checkbox" id={`${portal.name}`} name="applications" value={`${portal.name}`} />
                  <label className="form-label" htmlFor={`${portal.name}`}>{portal.name}</label>
                </div></div>
                </li>
              ))}
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" href="#">Log out</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </nav >
  );
}

export default Header;