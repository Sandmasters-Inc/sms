import React from 'react'
import { useHistory } from 'react-router-dom'
import slugify from 'slugify';
import styled from 'styled-components'
import { Button } from '../Button'

const Container = styled.div`
  padding: 5px 20px;
`

const Controls = styled.div`
  margin: 10px 0 10px 0;
  & button {
    margin-left: 20px;
  }
`

export const CustomerListItem = ({ customer, clickCustomer, deleteCustomer, editCustomer }) => {
  const history = useHistory()

  const handleClickCustomer = customer => {
    const slug = slugify(customer.name, { lower: true });

    clickCustomer(customer);
    history.push(`/customers/${slug}`);
  }

  const handleEditCustomer = customer => {
    editCustomer(customer)
    history.push(`edit-customer/${customer._id}`)
  }

  return (
    <Container>
      <div onClick={() => handleClickCustomer(customer)}>
        Customer: {customer.name}
      </div>
      <Controls>
        <Button onClick={() => handleEditCustomer(customer)}>Edit</Button>
        <Button onClick={() => deleteCustomer(customer)}>Delete</Button>
      </Controls>
    </Container>
  )
}