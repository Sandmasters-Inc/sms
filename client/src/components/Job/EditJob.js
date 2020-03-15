import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './styles.css';

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
      <h2>Edit Job</h2>
      <label htmlFor="active">Active</label>
      <input
        type="checkbox"
        name="active"
        value={active}
        onChange={e => onChange(e)}
      />
      <div>
        <h3>Address</h3>
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => onChange(e)}
        />
        <input
          name="street"
          type="text"
          placeholder="Street"
          value={street}
          onChange={e => onChange(e)}
        />
        <input
          name="city"
          type="text"
          placeholder="City"
          value={city}
          onChange={e => onChange(e)}
        />
        <input
          name="state"
          type="text"
          placeholder="State"
          value={state}
          onChange={e => onChange(e)}
        />
        <input
          name="zip"
          type="text"
          placeholder="Zip"
          value={zip}
          onChange={e => onChange(e)}
        />
      </div>
      <input
        name="approvedUser"
        type="text"
        placeholder="Approved By"
        value={approvedUser}
        onChange={e => onChange(e)}
      />
      <input
        name="status"
        type="text"
        placeholder="Status"
        value={status}
        onChange={e => onChange(e)}
      />
      <input
        name="primaryType"
        type="text"
        placeholder="Primary Type"
        value={primaryType}
        onChange={e => onChange(e)}
      />
      <input
        name="notes"
        type="text"
        placeholder="Notes"
        value={notes}
        onChange={e => onChange(e)}
      />
      <input
        name="inspector"
        type="text"
        placeholder="Inspector"
        value={inspector}
        onChange={e => onChange(e)}
      />
      <input
        name="payTerms"
        type="text"
        placeholder="Pay Terms"
        value={payTerms}
        onChange={e => onChange(e)}
      />
      <div>
        <label htmlFor="inquiryDate">Inquiry Date</label>
        <input
          type="date"
          name="inquiryDate"
          value={inquiryDate}
          onChange={e => onChange(e)}
        />
      </div>
      <div>
        <label htmlFor="inspectionDate">Inspection Date</label>
        <input
          type="date"
          name="inspectionDate"
          value={inspectionDate}
          onChange={e => onChange(e)}
        />
      </div>
      <div>
        <label htmlFor="followUpDate">Follow-Up Date</label>
        <input
          type="date"
          name="followUpDate"
          value={followUpDate}
          onChange={e => onChange(e)}
        />
      </div>
      <div>
        <label htmlFor="tentativeDate">Tentative Date</label>
        <input
          type="date"
          name="tentativeDate"
          value={tentativeDate}
          onChange={e => onChange(e)}
        />
      </div>
      <div>
        <label htmlFor="scheduledDate">Scheduled Date</label>
        <input
          type="date"
          name="scheduledDate"
          value={scheduledDate}
          onChange={e => onChange(e)}
        />
      </div>
      <div>
        <label htmlFor="completedDate">Completed Date</label>
        <input
          type="date"
          name="completedDate"
          value={completedDate}
          onChange={e => onChange(e)}
        />
      </div>
      <button onClick={() => update()}>Submit</button>
    </div>
  );
};

export default EditJob;
