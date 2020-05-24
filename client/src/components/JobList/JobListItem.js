import React from 'react';
import { useHistory } from 'react-router-dom';
import slugify from 'slugify';
import styled from 'styled-components'
import { Button } from '../Button'

const Container = styled.div`
  padding: 5px 20px;
`

const Controls = styled.div`
  margin: 10px 0 10px 0;
  & button {
    margin-left: 20px;
  }
`

export const JobListItem = props => {
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
    <Container >
      <div onClick={() => handleClickJob(job)}>
        Job: {job.name}
      </div>
      <Controls>
        <Button onClick={() => handleEditJob(job)}>Edit</Button>
        <Button onClick={() => deleteJob(job)}>Delete</Button>
      </Controls>
    </Container>
  )
}
