import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import cn from 'classnames'
import _ from 'lodash'
import Helmet from 'react-helmet'

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => {
  const [up, setUp] = useState()
  const [dark, setDark] = useState()
  const [themeButtonExpand, setThemeButtonExpand] = useState()
  const [themeButtonDownTime, setThemeButtonDownTime] = useState(0)

  const handleClickDiscover = () => setUp(val => !val)

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
    const binds = ['.concepts-title', '.theme-btn', '.site-title', '.nav-concepts', '.nav-about', '.nav-products', '.nav-contact']
    binds.forEach(selector => {
      const els = Array.from(document.querySelectorAll(selector))
      const i = selector === '.theme-btn' ? 2 : 0 // theme-btn reference is third on DOM
      const el = els.splice(i, 1)[0]

      const rect = el.getBoundingClientRect()
      els.forEach(svgEl => {
        if (selector === '.theme-btn') {
          svgEl.style.cx = (rect.left + rect.width / 2) + 'px'
          svgEl.style.cy = (rect.top + rect.height / 2) + 'px'
        } else {
          if (svgEl.tagName === 'text') {
            svgEl.setAttribute('x', rect.x)
            svgEl.setAttribute('y', rect.y)
          }
        }
      })
    })
  }

  useEffect(() => {
    initBinds()
    const onWheel = _.debounce(e => {
      setUp(e.deltaY > 0)
    }, 1)
    window.addEventListener('wheel', onWheel)
    return () => window.removeEventListener('onwheel', onWheel)
  }, [])

  return (
    <Layout before={
      <svg className='full-svg'>
        <clipPath id='theme-btn-clip'>
          <use href='#theme-btn-circle' />
        </clipPath>
        <circle id='theme-btn-circle' className={cn('theme-btn', up && 'up', themeButtonExpand && 'theme-btn-expand')} />
        <circle id='theme-btn-dark' className={cn('theme-btn', up && 'up')} />
      </svg>
    }>
      <SEO title="Portfolio" keywords={[`farolan`, `portfolio`, `gatsby`, `react`]} />
      <Helmet bodyAttributes={{ class: cn(dark && 'dark-mode') }} />

      <section className={cn('intro', up && 'up')}>
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

      <section className={cn('concepts', up && 'up')}>
        <header>
          <h2 className='concepts-title'>Selected concepts</h2>
          <p>Hover over the cards to learn more about concepts</p>
          <div className='theme-btn-container'>
            <button className='theme-btn' onMouseDown={handleMouseDownThemeButton} onMouseUp={handleMouseUpThemeButton} />
            Enable {dark ? 'light' : 'dark'} mode
          </div>
        </header>
      </section>

      <svg className='full-svg'>
        <g clipPath='url(#theme-btn-clip)'>
          <text className={cn('concepts-title', up && 'up')}>Selected concepts</text>
        </g>
      </svg>
    </Layout>
  )
}

export default IndexPage
