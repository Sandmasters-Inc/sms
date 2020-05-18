import React from 'react'
import { CustomerListItem } from './CustomerListItem'

export const CustomerList = ({ customers }) => {
  return customers.map(customer => (
    <CustomerListItem 
      key={customer._id}
      customer={customer}
    />
  ))
}