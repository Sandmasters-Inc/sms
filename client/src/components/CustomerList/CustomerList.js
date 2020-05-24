import React from 'react'
import { CustomerListItem } from './CustomerListItem'

export const CustomerList = ({ customers, deleteCustomer, editCustomer }) => {
  return customers.map(customer => (
    <CustomerListItem 
      key={customer._id}
      customer={customer}
      deleteCustomer={deleteCustomer}
      editCustomer={editCustomer}
    />
  ))
}