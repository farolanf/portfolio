/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"

const Layout = ({ before, children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        {before}
        <Header siteTitle={data.site.siteMetadata.title} />
        <main>{children}</main>
        <footer className='footer'>
          <div>© {new Date().getFullYear()} Farolan Faisal</div>
          <div>Design by <a href='https://dribbble.com/shots/5694008-Photography-Portfolio-Concept-Dark-Mode'>Daniel Korpai</a></div>
        </footer>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
