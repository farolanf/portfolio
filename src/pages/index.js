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
        <clipPath id='text-clip'>
          <use href='#text' />
        </clipPath>
        <text id='text' x='50%' y='95%'>creative</text>
        <image xlinkHref='/bg.svg' clipPath='url(#text-clip)' />
      </svg>
      <h2 className='tagline'>Bringing concepts to life</h2>
      <div className='description'>Every concept has its story. Discover my implementation of concepts by various designers.</div>
      <button>Discover my work</button>
    </section>
    <section className='concepts'>
      <header>
        <h2>Selected concepts</h2>
        <p>Hover over the cards to learn more about concepts</p>
      </header>
    </section>
  </Layout>
)

export default IndexPage
