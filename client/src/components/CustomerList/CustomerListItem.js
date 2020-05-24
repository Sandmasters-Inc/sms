import React from 'react'
import { useHistory } from 'react-router-dom'
import { slugify } from 'slugify'
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

export const CustomerListItem = ({ customer, deleteCustomer, editCustomer }) => {
  const history = useHistory()

  const handleEditCustomer = customer => {
    editCustomer(customer)
    history.push(`edit-customer/${customer._id}`)
  }

  return (
    <Container>
      Customer: {customer.name}
      <Controls>
        <Button onClick={() => handleEditCustomer(customer)}>Edit</Button>
        <Button onClick={() => deleteCustomer(customer)}>Delete</Button>
      </Controls>
    </Container>
  )
}