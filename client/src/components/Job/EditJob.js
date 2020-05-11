import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components'
import './styles.css';

const InputContainer = styled.div`
  display: flex;
  margin: 5px 0;
`
const Label = styled.label`
  width: 120px;
  text-align: right;
  margin-right: 10px;
`
const TextInput = styled.input`
  flex: 1;
`
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`

const EditJob = ({ token, job, onJobUpdated }) => {
  let history = useHistory();
  const [jobData, setJobData] = useState({
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
    
  });
  
  const { 
    active, 
    name,
    street,
    city,
    state,
    zip,
    approvedUser,
    // createdUser,
    // createdDate -- not editable
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

  const update = async () => {
    if (!name) {
      console.log('Address name is required');
    } else {
      const newJob = {
        active: active,
        name: name,
        street: street,
        city: city,
        state: state,
        zip: zip,
        approvedUser: approvedUser,
        // createdUser: user.id,
        // createdDate: createdDate,
        inquiryDate: inquiryDate,
        inspectionDate: inspectionDate,
        followUpDate: followUpDate,
        tentativeDate: tentativeDate,
        scheduledDate: scheduledDate,
        completedDate: completedDate,
        status: status,
        primaryType: primaryType,
        notes: notes, 
        inspector: inspector,
        payTerms: payTerms
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
    <div className="form-container">
      <h1>Edit Job</h1>
      <h2>Job Address</h2>
      <InputContainer>
        <Label htmlFor="name">Name</Label>
        <TextInput
          name="name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => onChange(e)}
        />
      </InputContainer>
      <InputContainer>
        <Label htmlFor="street">Street</Label>
        <TextInput
          name="street"
          type="text"
          placeholder="Street"
          value={street}
          onChange={e => onChange(e)}
        />
      </InputContainer>
      <InputContainer>
        <Label htmlFor="city">City</Label>
        <TextInput
          name="city"
          type="text"
          placeholder="City"
          value={city}
          onChange={e => onChange(e)}
        />
      </InputContainer>
      <InputContainer>
        <Label htmlFor="state">State</Label>
        <TextInput
          name="state"
          type="text"
          placeholder="State"
          value={state}
          onChange={e => onChange(e)}
        />
      </InputContainer>
      <InputContainer>
        <Label htmlFor="zip">Zip</Label>
        <TextInput
          name="zip"
          type="text"
          placeholder="Zip"
          value={zip}
          onChange={e => onChange(e)}
        />
      </InputContainer>
      <h2>Job Details</h2>
      <InputContainer>
        <Label htmlFor="approvedUser">Approved By</Label>
        <TextInput
          name="approvedUser"
          type="text"
          placeholder="Approved By"
          value={approvedUser}
          onChange={e => onChange(e)}
        />
      </InputContainer>
      <InputContainer>
        <Label htmlFor="status">Status</Label>
        <TextInput
          name="status"
          type="text"
          placeholder="Status"
          value={status}
          onChange={e => onChange(e)}
        />
      </InputContainer>
      <InputContainer>
        <Label htmlFor="primaryType">Primary Type</Label>
        <TextInput
          name="primaryType"
          type="text"
          placeholder="Primary Type"
          value={primaryType}
          onChange={e => onChange(e)}
        />
      </InputContainer>
      <InputContainer>
        <Label htmlFor="notes">Notes</Label>
        <TextInput
          name="notes"
          type="text"
          placeholder="Notes"
          value={notes}
          onChange={e => onChange(e)}
        />
      </InputContainer>
      <InputContainer>
        <Label htmlFor="inspector">Inspector</Label>
        <TextInput
          name="inspector"
          type="text"
          placeholder="Inspector"
          value={inspector}
          onChange={e => onChange(e)}
        />
      </InputContainer>
      <InputContainer>
        <Label htmlFor="payTerms">Pay Terms</Label>
        <TextInput
          name="payTerms"
          type="text"
          placeholder="Pay Terms"
          value={payTerms}
          onChange={e => onChange(e)}
        />
      </InputContainer>
      <InputContainer>
        <Label htmlFor="inquiryDate">Inquiry Date</Label>
        <TextInput
          type="date"
          name="inquiryDate"
          value={inquiryDate}
          onChange={e => onChange(e)}
        />
      </InputContainer>
      <InputContainer>
        <Label htmlFor="inspectionDate">Inspection Date</Label>
        <TextInput
          type="date"
          name="inspectionDate"
          value={inspectionDate}
          onChange={e => onChange(e)}
        />
      </InputContainer>
      <InputContainer>
        <Label htmlFor="followUpDate">Follow-Up Date</Label>
        <TextInput
          type="date"
          name="followUpDate"
          value={followUpDate}
          onChange={e => onChange(e)}
        />
      </InputContainer>
      <InputContainer>
        <Label htmlFor="tentativeDate">Tentative Date</Label>
        <TextInput
          type="date"
          name="tentativeDate"
          value={tentativeDate}
          onChange={e => onChange(e)}
        />
      </InputContainer>
      <InputContainer>
        <Label htmlFor="scheduledDate">Scheduled Date</Label>
        <TextInput
          type="date"
          name="scheduledDate"
          value={scheduledDate}
          onChange={e => onChange(e)}
        />
      </InputContainer>
      <InputContainer>
        <Label htmlFor="completedDate">Completed Date</Label>
        <TextInput
          type="date"
          name="completedDate"
          value={completedDate}
          onChange={e => onChange(e)}
        />
      </InputContainer>
      <InputContainer>
        <Label htmlFor="active">Active</Label>
        <input
          type="checkbox"
          name="active"
          value={active}
          onChange={e => onChange(e)}
        />
      </InputContainer>
      <ButtonContainer>
        <button onClick={() => update()}>Submit</button>
      </ButtonContainer>
    </div>
  );
};

export default EditJob;
