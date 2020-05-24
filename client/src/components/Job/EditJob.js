import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { JobForm } from './JobForm'

const EditJob = ({ token, job, onJobUpdated }) => {
  let history = useHistory();

  const update = async (updatedJob) => {
    if (!updatedJob.name) {
      console.log('Address name is required');
    } else {
      const newJob = {
        active: updatedJob.active,
        name: updatedJob.name,
        street: updatedJob.street,
        city: updatedJob.city,
        state: updatedJob.state,
        zip: updatedJob.zip,
        approvedUser: updatedJob.approvedUser,
        inquiryDate: updatedJob.inquiryDate,
        inspectionDate: updatedJob.inspectionDate,
        followUpDate: updatedJob.followUpDate,
        tentativeDate: updatedJob.tentativeDate,
        scheduledDate: updatedJob.scheduledDate,
        completedDate: updatedJob.completedDate,
        status: updatedJob.status,
        primaryType: updatedJob.primaryType,
        notes: updatedJob.notes, 
        inspector: updatedJob.inspector,
        payTerms: updatedJob.payTerms
      };

      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token
          }
        };

        // Create the job
        const body = JSON.stringify(newJob);
        const res = await axios.put(`/api/jobs/${job._id}`, body, config);

        // Call the handler and redirect
        onJobUpdated(res.data);
        history.push('/');
      } catch (error) {
        console.error(`Error updating job: ${error.response.data}`);
      }
    }
  };

  return (
    <JobForm job={job} formTitle="Edit Job" onComplete={update} />
  )
};

export default EditJob;
