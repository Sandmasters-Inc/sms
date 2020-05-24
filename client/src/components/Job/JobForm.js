import React, { useState } from 'react'
import { Button } from '../Button'
import { TextInput } from '../Inputs'
import { capitalize, separate } from '../../utils/StringUtils'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 0 auto;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  width: 500px;
`

export const JobForm = ({ job, formTitle, onComplete }) => {
  const [jobData, setJobData] = useState(() => {
    return job ? 
    {
      active: job.active,
      name: job.name,
      street: job.street,
      city: job.city,
      state: job.state,
      zip: job.zip,
      approvedUser: job.approvedUser,
      createdUser: job.createdUser,
      createdDate: job.createdDate,
      inquiryDate: job.inquiryDate,
      inspectionDate: job.inspectionDate,
      followUpDate: job.followUpDate,
      tentativeDate: job.tentativeDate,
      completedDate: job.completedDate,
      status: job.status,
      primaryType: job.primaryType,
      notes: job.notes,
      inspector: job.inspector,
      payTerms: job.payTerms
    } :
    {
      active: false,
      name: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      approvedUser: '',
      createdUser: null,
      createdDate: new Date(),
      inquiryDate: '',
      inspectionDate: '',
      followUpDate: '',
      tentativeDate: '',
      scheduledDate: '',
      completedDate: '',
      status: '',
      primaryType: '',
      notes: '',
      inspector: '',
      payTerms: ''
    }
  })

  const { 
    active, 
    name,
    street,
    city,
    state,
    zip,
    approvedUser,
    // createdUser,
    // createdDate,
    inquiryDate,
    inspectionDate,
    followUpDate,
    tentativeDate,
    scheduledDate,
    completedDate,
    status,
    primaryType,
    notes,
    inspector,
    payTerms
  } = jobData;

  const onChange = e => {
    const { name, value } = e.target;

    setJobData({
      ...jobData,
      [name]: value
    });
  };

  const makeInput = (name, field) => {
    let formattedName = capitalize(name)
    formattedName = separate(formattedName)

    return (
      <TextInput
        name={name}
        label={formattedName}
        value={field}
        onChange={e => onChange(e)}
      />
    )
  }

  return (
    <Container>
      <h1>{formTitle}</h1>
      <h2>Job Address</h2>
      {makeInput("name", name)}
      {makeInput("street", street)}
      {makeInput("city", city)}
      {makeInput("state", state)}
      {makeInput("zip", zip)}
      <h2>Job Details</h2>
      {makeInput("approvedUser", approvedUser)}
      {makeInput("status", status)}
      {makeInput("primaryType", primaryType)}
      {makeInput("notes", notes)}
      {makeInput("inspector", inspector)}
      {makeInput("payTerms", payTerms)}
      {makeInput("inquiryDate", inquiryDate)}
      {makeInput("inspectionDate", inspectionDate)}
      {makeInput("followUpDate", followUpDate)}
      {makeInput("tentativeDate", tentativeDate)}
      {makeInput("scheduledDate", scheduledDate)}
      {makeInput("completedDate", completedDate)}
      {makeInput("active", active)}
      <ButtonContainer>
        <Button onClick={() => onComplete(jobData)}>Submit</Button>
      </ButtonContainer>
    </Container>
  )
}