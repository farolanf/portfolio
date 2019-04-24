import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import cn from 'classnames'
import _ from 'lodash'
import Helmet from 'react-helmet'

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => {
  const [out, setOut] = useState()
  const [dark, setDark] = useState()
  const [themeButtonExpand, setThemeButtonExpand] = useState()
  const [themeButtonDownTime, setThemeButtonDownTime] = useState(0)

  const handleClickDiscover = () => setOut(val => !val)

  const handleMouseDownThemeButton = () => {
    setThemeButtonExpand(true)
    setThemeButtonDownTime(Date.now())
  }
  
  const handleMouseUpThemeButton = () => {
    const enable = Date.now() - themeButtonDownTime > 1000
    setThemeButtonExpand(enable)
    setDark(enable)
  }

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
      <Helmet bodyAttributes={{ class: cn(dark && 'dark-mode') }} />

      <svg id='theme-btn-svg'>
        <clipPath id='theme-btn-clip'>
          <use href='#theme-btn-circle' />
        </clipPath>
        <circle id='theme-btn-circle' className={themeButtonExpand && 'theme-btn-expand'} />
        <text x='50%' y='95%' fontSize='120' id='text2'>creative</text>
        <use href='#text2' filter='url(#invert)' clipPath='url(#theme-btn-clip)' />
      </svg>

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
          <svg id='concepts-title'>
            <text id='concepts-title' className='text'>Selected concepts</text>
          </svg>
          <p>Hover over the cards to learn more about concepts</p>
          <div className='theme-btn-container'>
            <button onMouseDown={handleMouseDownThemeButton} onMouseUp={handleMouseUpThemeButton} />
            Enable {dark ? 'light' : 'dark'} mode
          </div>
        </header>
      </section>

      <svg width='0' height='0' viewBox='0 0 0 0'>
        <defs>
          <filter id='invert'>
            <feColorMatrix type='matrix' values='-1 0 0 0 1
                                                  0 -1 0 0 1
                                                  0 0 -1 0 1
                                                  0 0 0 1 0' />
          </filter>
        </defs>
      </svg>
    </Layout>
  )
}

export default IndexPage
