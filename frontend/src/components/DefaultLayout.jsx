import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";

export default function DefaultLayout () {
  const {user, token,setUser,setToken} = useStateContext();
  const [sidebarActive, setSidebarActive] = useState(false);

  useEffect(() => {
    axiosClient.get('/user')
      .then(({data}) => {
        setUser(data);
      })
  },[]);
  // Because of this `[]` it is called once

  if (!token) {
    return <Navigate to="/login" />
  }

  const onLogout = (e) => {
    e.preventDefault();
    axiosClient.post('/logout')
      .then(() => {
        setUser({});
        setToken(null);
      })
  };

  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-md navbar-dark bg-custom mb-3">
        <div className="d-flex w-100 px-4 justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <button type="button" className="navbar-toggler mr-2" onClick={() => setSidebarActive(!sidebarActive)} >
              <span className="navbar-toggler-icon"></span>
            </button>
            <a className="navbar-brand" href="#">{user.name}</a>
          </div>

          <div className="text-white">
            <button onClick={onLogout} className="btn btn-logout text-white">Logout</button>
          </div>
        </div>
      </nav>
      <div className="container-fluid" id="main">
        <div className="row set-height">
          <div className={`col-md-3 col-lg-2 bg-light pl-0 sidebar-offcanvas menu-position-fixed ${
            sidebarActive ? "active" : "d-none d-md-block"
          }`}
               id="sidebar"
               role="navigation">
            <ul className="nav flex-column sticky-top pl-0 pt-5 mt-3 fw-bold">
              <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/posts">Posts</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/liked-posts">Liked Posts</Link></li>
            </ul>
          </div>
          <div className="col main pt-5 mt-3">
            <Outlet/>
          </div>
        </div>
      </div>
    </div>

  )
}
