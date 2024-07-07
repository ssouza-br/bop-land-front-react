import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="sidebar d-flex flex-column justify-content-between bg-dark text-white p-4 vh-100">
      <div>
        <Link to="/home" className="nav-link text-white">
          <i className="bi bi-ui-checks-grid fs-5 me-2"></i>
          <span className="fs-4">BOP Land</span>
        </Link>
        <hr className="text-secondary mt-2" />
        <ul className="nav nav-pills flex-column p-0 m-0">
          <li className="nav-item p-1">
            <Link to="/bops" className="nav-link text-white">
              <i className="bi bi-shield-check me-2 fs-5"></i>
              <span className="fs-5">BOP</span>
            </Link>
          </li>
          <li className="nav-item p-1">
            <div className="nav-link text-white">
              <i className="bi bi-ui-checks-grid fs-5 me-2"></i>
              <span className="fs-5">Testes</span>
            </div>
            <ul className="nav nav-pills flex-column p-2 m-0 ms-4">
              <li className="nav-item p-1">
                <Link to="/create-test" className="nav-link text-white">
                  <i className="bi bi-grid-1x2 me-2 fs-5"></i>
                  <span className="fs-6">Criar</span>
                </Link>
              </li>
              <li className="nav-item p-1">
                <Link to="/followup-test" className="nav-link text-white">
                  <i className="bi bi-layout-text-window-reverse me-2 fs-5"></i>
                  <span className="fs-6">Acompanhar</span>
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div>
        <hr className="text-secondary" />
        <button className="btn btn-link text-white p-0" onClick={logout}>
          <i className="bi bi-box-arrow-left fs-4"></i>
        </button>
        <span className="fs-5 ms-3">{user?.nome}</span>
      </div>
    </div>
  );
};

export default Sidebar;
