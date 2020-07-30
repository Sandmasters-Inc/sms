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

      & a {
        color: #555;
        text-decoration: none;
      }
    }
  }
`

const linkData = {
  admin: [
    { route: '/', text: 'Home' },
    { route: '/customers', text: 'Customers' },
    { route: '/jobs', text: 'Jobs' }
  ],
  sales: [
    { route: '/', text: 'Home' },
    { route: '/', text: 'Sales' },
  ]
}

const renderLinks = role => {
  const links = linkData[role];
  return links.map(link => <li><Link to={link.route}>{link.text}</Link></li>)
}

const Menu = ( { role } ) => {
  return (
    <Nav>
      <ul>
        {renderLinks(role)}
      </ul>
    </Nav>
  )
}

export default Menu