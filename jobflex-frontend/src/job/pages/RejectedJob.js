import React from "react";
import Card from "../../shared/components/UIElements/Card";

import JobList from "../components/showJob/JobList";
import USERS from "./dummydata";

const RejectedJob = () => {
  const FILTEREDUSER = USERS.filter((user) => user.status === "rejected");

  return (
    <div>
      <JobList items={FILTEREDUSER} />
    </div>
  );
};

export default RejectedJob;
