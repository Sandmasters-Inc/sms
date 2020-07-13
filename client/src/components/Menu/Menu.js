import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Nav = styled.nav`
  border-bottom: solid 1px black;
  & ul {
    list-style-type: none;
    flex: 1;

    & li {
      display: inline;
      text-align: center;
      padding: 10px;
    }
  }
`

const Menu = ( { user } ) => {
  return (
    <Nav>
      <ul>
        <li><Link to="/customers">Customers</Link></li>
        <li><Link to="/jobs">Jobs</Link></li>
        <li><Link to="/calendars">Calendars</Link></li>
      </ul>
    </Nav>
  )
}

export default Menu