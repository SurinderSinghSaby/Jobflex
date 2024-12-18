import React, {useContext} from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";
import { AuthContext } from "../../context/auth-context";

const NavLinks = (props) => {
 const auth = useContext(AuthContext);



  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/dashboard/:userId">Dashboard</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/:userId/alljob">All Job</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/:userId/addjob" exact>
          Add Job
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/:userId/pendingjob">Pending Job</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/:userId/acceptedjob">Accepted Job</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/:userId/rejectedjob">Rejected Job</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/:userId/userprofile">UserAccount</NavLink>
      </li>
      <li>
        <NavLink onClick={auth.logout}>Logout</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
