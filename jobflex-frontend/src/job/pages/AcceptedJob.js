import React from 'react'
import Card from '../../shared/components/UIElements/Card';

import JobList from '../components/showJob/JobList'
import USERS from './dummydata';

const AcceptedJob = () => {

    const FILTEREDUSER = USERS.filter(user => user.status === "accepted")

  return (
    <div>
        <JobList items={FILTEREDUSER} filter="accepted" />
    </div>
    
  )
}

export default  AcceptedJob