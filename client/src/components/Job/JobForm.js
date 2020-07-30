import React, { useState } from 'react'
import moment from 'moment'
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
      inquiryDate: moment(job.inquiryDate).format('YYYY-MM-DD'),
      inspectionDate: moment(job.inspectionDate).format('YYYY-MM-DD'),
      followUpDate: moment(job.followUpDate).format('YYYY-MM-DD'),
      tentativeDate: moment(job.tentativeDate).format('YYYY-MM-DD'),
      scheduledDate: moment(job.scheduledDate).format('YYYY-MM-DD'),
      completedDate: moment(job.completedDate).format('YYYY-MM-DD'),
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
    { name: 'inquiryDate', value: inquiryDate, type:'date', placeholder: 'yyyy-mm-dd' },
    { name: 'inspectionDate', value: inspectionDate, type:'date', placeholder: 'yyyy-mm-dd' },
    { name: 'followUpDate', value: followUpDate, type:'date', placeholder: 'yyyy-mm-dd' },
    { name: 'tentativeDate', value: tentativeDate, type:'date', placeholder: 'yyyy-mm-dd' },
    { name: 'scheduledDate', value: scheduledDate, type:'date', placeholder: 'yyyy-mm-dd' },
    { name: 'completedDate', value: completedDate, type:'date', placeholder: 'yyyy-mm-dd' },
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