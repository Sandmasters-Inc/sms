import React, { useState } from 'react'
import { Button } from '../Button'
import { InputType, InputFactory } from '../Inputs'
import { PageContent, PageControls } from '../Page'

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
    })
  }

  const config = [
    { name: 'name', value: name },
    { name: 'street', value: street },
    { name: 'city', value: city },
    { name: 'state', value: state },
    { name: 'zip', value: zip },
    <h2>Job Details</h2>,
    { name: 'approvedUser', value: approvedUser },
    { name: 'status', value: status },
    { name: 'primaryType', value: primaryType },
    { name: 'notes', value: notes },
    { name: 'inspector', value: inspector },
    { name: 'payTerms', value: payTerms },
    { name: 'inquiryDate', value: inquiryDate, type:'date' },
    { name: 'inspectionDate', value: inspectionDate, type:'date' },
    { name: 'followUpDate', value: followUpDate, type:'date' },
    { name: 'tentativeDate', value: tentativeDate, type:'date' },
    { name: 'scheduledDate', value: scheduledDate, type:'date' },
    { name: 'completedDate', value: completedDate, type:'date' },
    { name: 'active', value: active, inputType: InputType.checkbox }
  ]

  return (
    <PageContent>
      <h1>{formTitle}</h1>
      <h2>Job Address</h2>
      {config.map((props, i) => props.hasOwnProperty('name')
        ? <InputFactory key={i} {...props} onChange={e => onChange(e)} />
        : props)
      }
      <PageControls>
        <Button onClick={() => onComplete(jobData)}>Submit</Button>
      </PageControls>
    </PageContent>
  )
}