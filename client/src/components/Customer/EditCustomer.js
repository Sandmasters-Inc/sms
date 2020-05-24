import React from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { CustomerForm } from './CustomerForm'

export const EditCustomer = ({ token, customer, onCustomerUpdated }) => {
  let history = useHistory()

  const update = async (updatedCustomer) => {
    if (!customer.name) {
      console.log('Customer name is required')
    } else {
      const newCustomer = {
        name: updatedCustomer.name,
        firstName: updatedCustomer.firstName,
        lastName: updatedCustomer.lastName,
        company: updatedCustomer.company,
        address: updatedCustomer.address,
        city: updatedCustomer.city,
        state: updatedCustomer.state,
        zip: updatedCustomer.zip,
        businessType: updatedCustomer.businessType,
        phoneNumbers: updatedCustomer.phoneNumbers,
        email: updatedCustomer.email,
        referredBy: updatedCustomer.referredBy,
        adSource: updatedCustomer.adSource,
        useMeAsReference: updatedCustomer.useMeAsReference
      }

      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token
          }
        }

        // Create the customer
        const body = JSON.stringify(newCustomer)
        const res = await axios.put(`/api/customers/${customer._id}`, body, config)

        // Call the handler and redirect
        onCustomerUpdated(res.data)
        history.push('/')
      } catch (error) {
        console.error(`Error updating customer: ${error.response.data}`)
      }
    }
  }

  return (
    <CustomerForm customer={customer} onComplete={update} />
  )
}