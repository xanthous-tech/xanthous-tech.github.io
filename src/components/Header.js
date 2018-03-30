import React from 'react'
import Link from 'gatsby-link'
import './Header.css'

const Header = () => (
  <div className="header-wrapper">
    <div className="header-content">
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: 'black',
            textDecoration: 'none',
          }}
        >
          Xanthous Tech
        </Link>
      </h1>
    </div>
  </div>
)

export default Header
