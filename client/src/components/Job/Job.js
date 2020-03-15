import React from 'react';
import moment from 'moment';

const Job = props => {
  const { job } = props;
  const formatDate = (date) => moment(new Date(date)).format('MM-DD-YYYY');

  return (
    <div>
      <h2>Job Address</h2>
      <div>{`Name: ${job.name}`}</div>
      <div>{`Street: ${job.street}`}</div>
      <div>{`City: ${job.city}`}</div>
      <div>{`State: ${job.state}`}</div>
      <div>{`Zip: ${job.zip}`}</div>
      
      <h2>Job Details</h2>
      <div>{`Active: ${job.active.toString()}`}</div>
      <div>{`Approved By: ${job.approvedUser}`}</div>
      <div>{`Status: ${job.status}`}</div>
      <div>{`Primary Type: ${job.primaryType}`}</div>
      <div>{`Rooms/Notes: ${job.notes}`}</div>
      <div>{`Inspector: ${job.inspector}`}</div>
      <div>{`Pay Terms: ${job.payTerms}`}</div>
      <div>{`Inquiry Date: ${formatDate(job.inquiryDate)}`}</div>
      <div>{`Inspection Date: ${formatDate(job.inspectionDate)}`}</div>
      <div>{`Follow-Up Date: ${formatDate(job.followUpDate)}`}</div>
      <div>{`Tentative Date: ${formatDate(job.tentativeDate)}`}</div>
      <div>{`Scheduled Date: ${formatDate(job.scheduledDate)}`}</div>
      <div>{`Completed Date: ${formatDate(job.completedDate)}`}</div>
    </div>
  );
};

export default Job;
