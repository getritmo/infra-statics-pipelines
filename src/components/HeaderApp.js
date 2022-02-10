import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'

import { useAuth0 } from '@auth0/auth0-react'

const HeaderApp = () => {
  const userStatus = useSelector((state) => state.appData.user)
  const [isOpen, setIsOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth0()

  const openSubmenu = (e) => {
    e.preventDefault()
    setIsOpen(true)
  }

  const logoutWithRedirectFunction = () => {
    localStorage.removeItem('preventSend')
    localStorage.removeItem('urlParams')
    localStorage.removeItem('connector')
    localStorage.removeItem('redirectUrl')
    localStorage.removeItem('referrer')
    logout({
      client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
      returnTo: window.location.origin + '/registration',
    })
  }

  return (
    <nav className="header-app">
      <ul>
        <li>
          <a href="/">
            <img
              src="/images/svg/ritmo-logo-blue.svg"
              alt="RITMO Logo"
              className="header-bar__logo"
            />
          </a>
        </li>
      </ul>

      {isAuthenticated && (
        <ul>
          <UncontrolledDropdown nav inNavbar className={isOpen ? 'open' : ''}>
            <DropdownToggle
              nav
              caret
              id="profileDropDown"
              onClick={openSubmenu}
            >
              {userStatus && (
                <DropdownItem header>
                  {userStatus.name + ' ' + userStatus.surname}
                </DropdownItem>
              )}
              <img
                src={user.picture}
                alt="Profile"
                className="nav-user-profile rounded-circle"
                width="50"
              />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                id="qsLogoutBtn"
                onClick={() => logoutWithRedirectFunction()}
              >
                Log out
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </ul>
      )}
    </nav>
  )
}

export default HeaderApp
