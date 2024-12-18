import React, { useCallback, useEffect, useReducer, useContext,  useState } from "react";
import Card from "../../shared/components/UIElements/Card";

import JobList from "../components/showJob/JobList";
import USERS from "./dummydata";
import Button from "../../shared/components/FormElements/Button";
import {useForm} from "../../shared/hooks/useForm";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useParams, useNavigate } from "react-router-dom";

import "./UpdateJob.css";
import Input from "../../shared/components/FormElements/Input";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import { FaHistory } from "react-icons/fa";

const UpdateJob = () => {
  const auth = useContext(AuthContext);
   const {isLoading, error, sendRequest, clearError} = useHttpClient();
   const [loadedPlace, setloadedPlace] = useState();
   const Jobid = useParams().jobid;
  const history = useNavigate(); 
  // const currentJob = USERS.find((job) => job.id === Jobid);

   const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      company: {
        value: '',
        isValid: false
      },
      location: {
        value: '',
        isValid: false
      }
    },
    false
  );

  
    useEffect(() => {
      const fetchJob = async () => {
        try{
          const responseData = await sendRequest( process.env.REACT_APP_BACKEND_URL + `/jobs/${Jobid}`);
          console.log(responseData)
          setloadedPlace(responseData.job);
          setFormData(
            {
              title: {
                value: responseData.job.title,
                isValid: true
              },
              company: {
                value: responseData.job.company,
                isValid: true
              },
              location: {
                value: responseData.job.location,
                isValid: true
              }
              }, true
          )
       
        } catch (err){
          console.log("error")
        }
        
       
      }
      fetchJob();
    }, [sendRequest, Jobid, setFormData])



  const UpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(process.env.REACT_APP_BACKEND_URL + `/jobs/${Jobid}`,
      'PATCH',
       JSON.stringify({
       title: formState.inputs.title.value,
       company: formState.inputs.company.value,
       location: formState.inputs.location.value}),
       {
        Authorization: 'Bearer ' + auth.token,
         'Content-Type': 'application/json'
       }
     );
     history.push('/dashboard' + auth.userId + '/jobs')
    }catch (err){
      console.log("error")
    }  
    
  };

  if(isLoading){
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }

  if(!loadedPlace && error){
    return (
      <div className="center">
        <Card>
          <h2>Could not find job!</h2>
        </Card>
      </div>
    );
  }

  return (
    <div className="">
      {!isLoading && loadedPlace && (
      <form className="place-form" onSubmit={UpdateSubmitHandler}>
        <h1>Update Job</h1>

        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
          value={loadedPlace.title}
          valid={true}
        />

        <Input
          id="company"
          element="input"
          type="text"
          label="Company"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid Company."
          onInput={inputHandler}
          value={loadedPlace.company}
          valid={true}
        />
        <Input
          id="location"
          element="input"
          type="text"
          label="Location"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid location."
          onInput={inputHandler}
          value={loadedPlace.location}
          valid={true}
        />

        <Button type="submit" disabled={!formState.isValid}>
          Update Job
        </Button>
      </form>
      )}
    </div>
  );
};

export default UpdateJob;


