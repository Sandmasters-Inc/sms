import React from 'react';
import JobListItem from './JobListItem';

const JobList = props => {
  const { jobs, clickJob, deleteJob, editJob } = props;
  return jobs.map(job => (
    <JobListItem
      key={job._id}
      job={job}
      clickJob={clickJob}
      deleteJob={deleteJob}
      editJob={editJob}
    />
  ));
};

export default JobList;
