import React from "react";
import { Outlet } from "react-router-dom";
import MainNavigation from "../../shared/components/Navigation/MainNavigation";

const Dashboard = () => {
  return (
    <>
      <MainNavigation />
      <Outlet />
    </>
  );
};

export default Dashboard;
