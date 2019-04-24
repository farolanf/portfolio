import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header className='page-header'>
    <nav className='main-nav container'>
      <h1>
        <Link to="/">{siteTitle}</Link>
      </h1>
      <div className='right-nav'>
        <a href='#concepts'>Concepts</a>
        <a href='#about'>About</a>
        <a href='#work'>Products</a>
        <a href='#contact'>Contact</a>
      </div>
    </nav>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
