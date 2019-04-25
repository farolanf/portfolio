import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header className='page-header'>
    <svg id='header-svg' className='full-svg'>
      <rect id='header-rect' fill='white' />
      <line id='header-line' x1='0' y1='100%' x2='100%' y2='100%' stroke='#e8e8e8' />
      <g clipPath='url(#theme-btn-clip)'>
        <rect id='header-rect' fill='black' />
        <line id='header-line' x1='0' y1='100%' x2='100%' y2='100%' stroke='#333' />
      </g>
    </svg>
    <nav className='main-nav container'>
      <h1>
        <Link to="/" className='site-title'>{siteTitle}</Link>
      </h1>
      <div className='right-nav'>
        <a href='#concepts'>Concepts</a>
        <a href='#about'>About</a>
        <a href='#work'>Products</a>
        <a href='#contact'>Contact</a>
      </div>
    </nav>
    <svg className='full-svg'>
      <g clipPath='url(#theme-btn-clip)'>
        <text className='site-title'>{siteTitle}</text>
      </g>
    </svg>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
