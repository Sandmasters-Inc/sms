import React from 'react';
import { useHistory } from 'react-router-dom';
import slugify from 'slugify';
import './styles.css';

const JobListItem = props => {
  const { job, clickJob, deleteJob, editJob } = props;
  const history = useHistory();

  const handleClickJob = job => {
    const slug = slugify(job.name, { lower: true });

    clickJob(job);
    history.push(`/jobs/${slug}`);
  };

  const handleEditJob = job => {
    editJob(job);
    history.push(`/edit-job/${job._id}`);
  };

  return (
    <div>
      <div className="jobListItem" onClick={() => handleClickJob(job)}>
        Job: {job.name}
      </div>
      <div className="jobControls">
        <button onClick={() => deleteJob(job)}>Delete</button>
        <button onClick={() => handleEditJob(job)}>Edit</button>
      </div>
    </div>
  );
};

export default JobListItem;
