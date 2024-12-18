import React, { useCallback, useReducer, useContext } from "react";
import Card from "../../shared/components/UIElements/Card";

import { AuthContext } from "../../shared/context/auth-context";
import JobList from "../components/showJob/JobList";
import USERS from "./dummydata";
import Button from "../../shared/components/FormElements/Button";

import { useForm } from "../../shared/hooks/useForm";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";

import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./AddJob.css";
import Input from "../../shared/components/FormElements/Input";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

const AddJob = () => {
  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      address: {
        value: '',
        isValid: false
      }
    },
    false
  );
  const jobSubmitHandler = async (event) => {
    event.preventDefault();
    try{
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/jobs/",
        "POST",
        JSON.stringify({
          //status: formState.inputs.status.value,
          title: formState.inputs.title.value,
          //type: formState.inputs.type.value,
          company: formState.inputs.company.value,
          //description: formState.inputs.description.value,
          //dateadded: formState.inputs.dateadded.value,
          //deadline: formState.inputs.deadline.value,
          location: formState.inputs.location.value,
          creatorId: auth.userId,
        }),
        {
          "Authorization": `Bearer ${auth.token}`,
          "Content-Type": "application/json",
        }
      );
      //Redirect user to different page
    } catch (err){
      console.log("error");
    }
    
  };

  return (
    <React.Fragment>

      <div className="">
      <form className="place-form" onSubmit={jobSubmitHandler}>
   
        {<h1>Add Job</h1>}

        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />

        <Input
          id="company"
          element="input"
          type="text"
          label="Company Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid Company Name."
          onInput={inputHandler}
        />
        <Input
          id="location"
          element="input"
          type="text"
          label="Location"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid Company Name."
          onInput={inputHandler}
        />

        <Button type="submit" >
          ADD PLACE
        </Button>
      </form>
    </div>
    </React.Fragment>
    
  );
};

export default AddJob;
