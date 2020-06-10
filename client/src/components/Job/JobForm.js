import React, { useState } from 'react'
import { Button } from '../Button'
import { TextInput } from '../Inputs'
import { PageContent, PageControls } from '../Page'
import { capitalize, separate } from '../../utils/StringUtils'
import styled from 'styled-components'

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

  const makeInput = (name, field, type = 'text') => {
    let formattedName = capitalize(name)
    formattedName = separate(formattedName)

    return (
      <TextInput
        type={type}
        name={name}
        label={formattedName}
        value={field}
        onChange={e => onChange(e)}
      />
    )
  }

  return (
    <PageContent>
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
      {makeInput("inquiryDate", inquiryDate, "date")}
      {makeInput("inspectionDate", inspectionDate, "date")}
      {makeInput("followUpDate", followUpDate, "date")}
      {makeInput("tentativeDate", tentativeDate, "date")}
      {makeInput("scheduledDate", scheduledDate, "date")}
      {makeInput("completedDate", completedDate, "date")}
      {makeInput("active", active, "checkbox")}
      <PageControls>
        <Button onClick={() => onComplete(jobData)}>Submit</Button>
      </PageControls>
    </PageContent>
  )
}