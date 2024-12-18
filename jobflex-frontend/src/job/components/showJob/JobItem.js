
import React, {useContext, useState} from "react";
import moment from "moment";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Card from "../../../shared/components/UIElements/Card";
import JobInfo from "./JobInfo";
import Button from "../../../shared/components/FormElements/Button";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import "./JobItem.css";
import { AuthContext } from "../../../shared/context/auth-context";
const JobItem = (props) => {
  const auth = useContext(AuthContext);
  const {isLoading, error, sendRequest, clearError} = useHttpClient();

  const {
    key,
    id,
    status,
    title,
    type,
    company,
    description,
    dateadded,
    deadline,
    location,
    creatorId,
  } = props;

  let dateadd = moment(dateadded);
  let datedeadline = moment(deadline);
  dateadd = dateadd.format("MMM Do, YYYY");
  datedeadline = datedeadline.format("MMM Do, YYYY");

  const confirmDeleteHandler = async () => {
    console.log("delete");
    try{
      await sendRequest(process.env.REACT_APP_BACKEND_URL+`/jobs/${props.id}`,
       "DELETE",
       null,
        {
          Authorization: 'Bearer ' + auth.token
        }
       );
      console.log("deleted")
    }catch(err){
      console.log(err)
    }
    props.onDelete(props.id)
  };

  return (
    <Card >
      <header className="main__header">
        <div className="main__header-icon">{company.charAt(0)}</div>
        <div className="main__header-info">
          <h5>{title}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={location} />
          {/*<JobInfo icon={<FaCalendarAlt />} text={datedeadline} />
          <JobInfo icon={<FaCalendarAlt />} text={dateadd} />
          <JobInfo icon={<FaBriefcase />} text={type} />
          <div className={`status ${status}`}>{status}</div>*/}
        </div>
        <footer>
          <div className="main__footer-buttons">
            <Button to={`/dashboard/updatejob/${id}/`} >Edit</Button>
            <Button onClick={confirmDeleteHandler} > Delete</Button>
          </div>
        </footer>
      </div>
    </Card>
  );
};

export default JobItem;
