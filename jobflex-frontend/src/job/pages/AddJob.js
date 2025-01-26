import React, { useContext } from "react";
import { postData } from "../../shared/util/api"; 


import Button from "../../shared/components/FormElements/Button";
import { AuthContext } from "../../shared/context/auth-context";

import { useForm } from "../../shared/hooks/useForm";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";

import Input from "../../shared/components/FormElements/Input";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./AddJob.css";

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
      const requestBody = JSON.stringify({
        //status: formState.inputs.status.value,
        title: formState.inputs.title.value,
        //type: formState.inputs.type.value,
        company: formState.inputs.company.value,
        //description: formState.inputs.description.value,
        //dateadded: formState.inputs.dateadded.value,
        //deadline: formState.inputs.deadline.value,
        location: formState.inputs.location.value,
        creatorId: auth.userId,
      })
      const response = await postData("api/jobs", requestBody);
      console.log("Job submitted successfully:", response);
  }  catch (err) {
    console.log(err)
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
