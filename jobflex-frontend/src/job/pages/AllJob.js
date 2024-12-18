import React, {useContext, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import Card from "../../shared/components/UIElements/Card";

import JobList from "../components/showJob/JobList";

import user from "../../user/assets/DummyUser";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";



const AllJob = () => {

  const [loadedJobs, setloadedJobs] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const auth = useContext(AuthContext);


  const userId = auth.userId;

  useEffect(() => {
    const fetchJobs = async () => {
      try{
        const response = await sendRequest( process.env.REACT_APP_BACKEND_URL + `/jobs/user/${userId}`);
        setloadedJobs(response.jobs)

      } catch (err) {
        console.log("none")
      }
      
    }
    fetchJobs();
  }, [sendRequest, userId])

  const deleteJobHandler = (deletedJobId) => {
    setloadedJobs(prevJobs => prevJobs.filter(job => job.id !== deletedJobId))
  }

  //const loadedPlaces = JOBS.filter((job) => job.creator === userId);

  return (
    <div>
      {!isLoading && loadedJobs && <JobList items={loadedJobs} onDeleteJob={deleteJobHandler}/>}
    </div>
  );
};

export default AllJob;
