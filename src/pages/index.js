import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Portfolio" keywords={[`farolan`, `portfolio`, `gatsby`, `react`]} />
    <section className='intro'>
      <svg className='hero'>
        <object data='/2.svg' type='image/svg+xml' />
        <text x='50%' y='95%'>creative</text>
      </svg>
      <div className='tagline'>Bringing concepts to life</div>
      <div className='description'>Every concept has its story. Discover my implementation of concepts from various designers.</div>
    </section>
  </Layout>
)

export default IndexPage
