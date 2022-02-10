import React from 'react'
const Header = () => {
  return (
    <nav className="header-bar">
      <ul>
        <li>
          <a href="/">
            <img
              src="/images/svg/ritmo-logo-white.svg"
              alt="RITMO Logo"
              className="header-bar__logo"
            />
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Header
