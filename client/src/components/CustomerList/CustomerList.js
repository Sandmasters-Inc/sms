import React from 'react'
import { CustomerListItem } from './CustomerListItem'

export const CustomerList = ({ customers, clickCustomer, deleteCustomer, editCustomer }) => {
  return customers.map(customer => (
    <CustomerListItem 
      key={customer._id}
      customer={customer}
      clickCustomer={clickCustomer}
      deleteCustomer={deleteCustomer}
      editCustomer={editCustomer}
    />
  ))
}