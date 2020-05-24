import React from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { CustomerForm } from './CustomerForm'

export const CreateCustomer = ({ token, onCustomerCreated}) => {
  let history = useHistory()

  const create = async (customer) => {
    if (!customer.name) {
      console.log('Customer name is required')
    } else {
      const newCustomer = {
        name: customer.name,
        firstName: customer.firstName,
        lastName: customer.lastName,
        company: customer.company,
        address: customer.address,
        city: customer.city,
        state: customer.state,
        zip: customer.zip,
        businessType: customer.businessType,
        phoneNumbers: customer.phoneNumbers,
        email: customer.email,
        referredBy: customer.referredBy,
        adSource: customer.adSource,
        useMeAsReference: customer.useMeAsReference
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
        const res = await axios.post('api/customers', body, config)

        // Call the handler and redirect
        onCustomerCreated(res.data)
        history.push('/')
      } catch (error) {
        console.error(`Error creating customer: ${error.response.data}`)
      }
    }
  }

  return (
    <CustomerForm formTitle="New Customer" onComplete={create} />
  )
}