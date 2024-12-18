import React from "react";

import JobItem from "./JobItem";
import "./JobList.css";

const JobList = (props) => {
  console.log(props.items)
  if (props.items.length === 0) {
    return (
      <div className="center">
        <h2>No jobs found.</h2>
      </div>
    );
  }

  return (

  <div className='jobs'>
    <div className='jobs-cards'>
      {props.items.map((job) => (
            <JobItem
              //key={job.id}
              id={job.id}
              //status={job.status}
              title={job.title}
              //type={job.type}
            company={job.company}
              //description={job.description}
              //dateadded={job.dateadded}
              //deadline={job.deadline}
              location={job.location}
              creatorId={job.creatorId}
              onDelete={props.onDeleteJob}
            /> 
          ))}
        </div>
  </div>


   
  );
};

export default JobList;
