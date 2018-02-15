import React from "react";
import { Link } from "react-router-dom";
import { logoutUser, toggleSideBar } from "../actions/index";
import AppBar from "material-ui/AppBar";

import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";

export default props => (
  <div className="nav-bar-custom">
    <AppBar
      title="Time Management App"
      onLeftIconButtonClick={() =>
        props.dispatch(toggleSideBar(props.sideBarOpened))}
      iconClassNameRight="muidocs-icon-navigation-expand-more"
    />

    <Drawer
      docked={false}
      width={200}
      open={props.sideBarOpened}
      onRequestChange={() => props.dispatch(toggleSideBar(props.sideBarOpened))}
    >
    {props.visibleRoutes.find(e => e === "/tasks") && 
    <MenuItem onClick={() => props.dispatch(toggleSideBar(props.sideBarOpened))}>
        <Link  to="/" className="nav-link">
          Tasks
        </Link>
      </MenuItem>
    }
    
      {props.visibleRoutes.find(e => e === "/users") && 
        <MenuItem onClick={() => props.dispatch(toggleSideBar(props.sideBarOpened))} >
          <Link to="/users" className="nav-link">
            Users
          </Link>
        </MenuItem>
      }
       <MenuItem onClick={() => props.dispatch(toggleSideBar(props.sideBarOpened))} >
          <Link to="/my-account" className="nav-link">
            My Account
          </Link>
        </MenuItem>
      <MenuItem onClick={() => props.dispatch(logoutUser())}>
        <Link to="/users" className="nav-link">
          Logout
        </Link>
      </MenuItem>
    </Drawer>
  </div>
);
