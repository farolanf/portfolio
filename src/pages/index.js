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
    const duration = Date.now() - themeButtonDownTime
    const enable = duration > 1000
    const hint = duration < 75
    if (hint) {
      setTimeout(() => {
        setThemeButtonExpand(false)
        setDark(false)
      }, 300)
    } else {
      setThemeButtonExpand(enable)
      setDark(enable)
    }
  }

  const initBinds = () => {
    const binds = ['.concepts-title', '.theme-btn']
    binds.forEach(selector => {
      const i = selector === '.theme-btn' ? 1 : 0
      const els = document.querySelectorAll(selector)
      const rect = els[i].getBoundingClientRect()
      if (selector === '.theme-btn') {
        els[1-i].style.cx = (rect.left + rect.width / 2) + 'px'
        els[1-i].style.cy = (rect.top + rect.height / 2) + 'px'
      } else {
        els[1-i].style.left = rect.left + 'px'
        els[1-i].style.top = rect.top + 'px'
      }
    })
  }

  useEffect(() => {
    initBinds()
    const onWheel = _.debounce(e => {
      setOut(e.deltaY > 0)
    }, 1)
    window.addEventListener('wheel', onWheel)
    return () => window.removeEventListener('onwheel', onWheel)
  }, [])

  return (
    <Layout before={
      <svg id='theme-btn-svg'>
        <clipPath id='theme-btn-clip'>
          <use href='#theme-btn-circle' />
        </clipPath>
        <circle id='theme-btn-circle' className={cn('theme-btn', out && 'theme-btn-up', themeButtonExpand && 'theme-btn-expand')} />
      </svg>
    }>
      <SEO title="Portfolio" keywords={[`farolan`, `portfolio`, `gatsby`, `react`]} />
      <Helmet bodyAttributes={{ class: cn(dark && 'dark-mode') }} />

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
          <h2 className='concepts-title'>Selected concepts</h2>
          <p>Hover over the cards to learn more about concepts</p>
          <div className='theme-btn-container'>
            <button className='theme-btn' onMouseDown={handleMouseDownThemeButton} onMouseUp={handleMouseUpThemeButton} />
            Enable {dark ? 'light' : 'dark'} mode
          </div>
        </header>
      </section>

      <svg id='text-svg'>
        <g clipPath='url(#theme-btn-clip)'>
          <text id='concepts-title' className='concepts-title' x='156' y='113'>Selected concepts</text>
        </g>
      </svg>
    </Layout>
  )
}

export default IndexPage
