import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { JobForm } from './JobForm'

const CreateJob = ({ token, onJobCreated }) => {
  let history = useHistory();

  const create = async (job) => {
    if (!job.name) {
      console.log('Address name is required');
    } else {
      const newJob = {
        active: job.active,
        name: job.name,
        street: job.street,
        city: job.city,
        state: job.state,
        zip: job.zip,
        approvedUser: job.approvedUser,
        inquiryDate: job.inquiryDate,
        inspectionDate: job.inspectionDate,
        followUpDate: job.followUpDate,
        tentativeDate: job.tentativeDate,
        scheduledDate: job.scheduledDate,
        completedDate: job.completedDate,
        status: job.status,
        primaryType: job.primaryType,
        notes: job.notes, 
        inspector: job.inspector,
        payTerms: job.payTerms
      }

      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token
          }
        };

        // Create the job
        const body = JSON.stringify(newJob);
        const res = await axios.post('api/jobs', body, config);

        // Call the handler and redirect
        onJobCreated(res.data);
        history.push('/jobs');
      } catch (error) {
        console.error(`Error creating job: ${error.response.data}`);
      }
    }
  };

  return (
    <JobForm formTitle="New Job" onComplete={create} />
  )
};

export default CreateJob;