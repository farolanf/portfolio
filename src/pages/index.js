import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import cn from 'classnames'
import _ from 'lodash'

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => {
  const [out, setOut] = useState()

  const handleClickDiscover = () => setOut(val => !val)

  useEffect(() => {
    const onWheel = _.debounce(e => {
      setOut(e.deltaY > 0)
    }, 1)
    window.addEventListener('wheel', onWheel)
    return () => window.removeEventListener('onwheel', onWheel)
  }, [])

  return (
    <Layout>
      <SEO title="Portfolio" keywords={[`farolan`, `portfolio`, `gatsby`, `react`]} />
      <section className={cn('intro', out && 'out')}>
        <svg className='hero'>
          <clipPath id='text-clip'>
            <use href='#text' />
          </clipPath>
          <text id='text' x='50%' y='95%'>creative</text>
          <image xlinkHref='/bg.svg' clipPath='url(#text-clip)' />
        </svg>
        <h2 className='tagline'>Bringing concepts to life</h2>
        <div className='description'>Every concept has its story. Discover my implementation of concepts by various designers.</div>
        <button onClick={handleClickDiscover}>Discover my work</button>
      </section>
      <section className='concepts'>
        <header>
          <h2>Selected concepts</h2>
          <p>Hover over the cards to learn more about concepts</p>
        </header>
      </section>
    </Layout>
  )
}

export default IndexPage
