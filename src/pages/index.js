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
      const i = selector === '.theme-btn' ? 3 : 0 // theme-btn reference is third on DOM
      const el = els.splice(i, 1)[0]

      const rect = el.getBoundingClientRect()
      els.forEach(svgEl => {
        if (selector === '.theme-btn') {
          if (svgEl.tagName === 'circle') {
            svgEl.style.cx = (rect.left + rect.width / 2) + 'px'
            svgEl.style.cy = (rect.top + rect.height / 2) + 'px'
          } else if (svgEl.tagName === 'g') {
            svgEl.setAttribute('transform', `translate(${rect.left}, ${rect.top})`)
          }
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

  useEffect(() => {
    if (!up && dark) {
      setThemeButtonExpand(false)
      setDark(false)
    }
  }, [up])

  useEffect(() => {
    const el = document.getElementById(dark ? 'moonAnim' : 'moonAnimReverse')
    el.beginElement()
  }, [dark])

  return (
    <Layout before={
      <svg className='full-svg'>
        <clipPath id='theme-btn-clip'>
          <use href='#theme-btn-circle' />
        </clipPath>
        <circle id='theme-btn-circle' className={cn('theme-btn', up && 'up', themeButtonExpand && 'theme-btn-expand')} />
        <circle id='theme-btn-dark' className={cn('theme-btn', up && 'up', themeButtonExpand && 'theme-btn-dark-expand')} />
        <g id='theme-btn-moon' className='theme-btn'>
          <g id='theme-btn-moon-inner' className={cn(up && 'up', themeButtonExpand && 'theme-btn-dark-expand')}>
            <path d='M 4.4991019,-0.08928207 C -4.8597634,4.077562 3.1432226,17.140288 11.245419,10.162478 5.0612955,10.49318 1.9857664,4.937387 4.4991019,-0.08928207 Z' fill='#ff0066' transform='translate(11, 11.5) scale(.9, .9)'>
              <animate id='moonAnim' attributeName='d' dur='1s' repeatCount='1' from='M 4.4991019,-0.08928207 C -4.8597634,4.077562 3.1432226,17.140288 11.245419,10.162478 5.0612955,10.49318 1.9857664,4.937387 4.4991019,-0.08928207 Z' to='M 5.4804411,2.4496519 C -0.71764283,5.2092225 4.5824846,13.860258 9.948316,9.2390718 12.705325,6.7514811 10.355595,0.88173723 5.4804411,2.4496519 Z' begin='indefinite' fill='freeze' />
              <animate id='moonAnimReverse' attributeName='d' dur='1s' repeatCount='1' to='M 4.4991019,-0.08928207 C -4.8597634,4.077562 3.1432226,17.140288 11.245419,10.162478 5.0612955,10.49318 1.9857664,4.937387 4.4991019,-0.08928207 Z' from='M 5.4804411,2.4496519 C -0.71764283,5.2092225 4.5824846,13.860258 9.948316,9.2390718 12.705325,6.7514811 10.355595,0.88173723 5.4804411,2.4496519 Z' begin='indefinite' fill='freeze' />
            </path>
            <path d='M 10.381162,7.0132703 C 10.084203,6.9583729 9.8658019,6.7796667 9.8774972,6.6377485 9.8891324,6.4965598 10.134788,6.3599324 10.441592,6.3599324 c 0.306754,0 0.555641,0.1599699 0.533394,0.3800674 -0.02217,0.2193613 -0.29683,0.3281745 -0.593824,0.2732705 z M 8.9656223,9.4143004 C 8.7665419,9.1834269 8.7094993,8.9049272 8.8158719,8.7985973 8.9222448,8.6922671 9.2007211,8.7494229 9.4315142,8.9485999 9.6623073,9.1477768 9.7497881,9.4301182 9.5983982,9.5814449 9.4470081,9.7327717 9.1647028,9.6451741 8.9656223,9.4143004 Z M 6.3765015,10.423175 c 1.03e-5,-0.01957 6.371e-4,-0.03913 0.00185,-0.05859 0.017548,-0.282227 0.1435765,-0.4945181 0.276269,-0.5053797 0.1419218,-0.011617 0.3205215,0.2068817 0.3752726,0.5038687 0.054758,0.297024 -0.054193,0.571637 -0.2735787,0.593705 -0.2018314,0.0203 -0.3597842,-0.192248 -0.3779629,-0.475018 -0.00125,-0.01946 -0.00186,-0.03902 -0.00185,-0.05859 z M 3.7882878,9.4118956 C 3.9877223,9.1809966 4.2544776,9.0844134 4.3745152,9.1740037 4.4943648,9.2634538 4.478651,9.5468006 4.3165729,9.8036534 4.154447,10.060582 3.8885267,10.188876 3.7161072,10.061583 3.5438658,9.9344204 3.5889109,9.642728 3.7882878,9.4118956 Z M 2.3748727,7.0096779 C 2.6724879,6.9549628 2.938574,7.0440892 2.9766557,7.1826051 3.0149166,7.3217729 2.8317278,7.5347821 2.5477999,7.6391767 2.2639913,7.7435274 1.9767647,7.6826866 1.9191823,7.4736904 1.8614262,7.2640633 2.0771327,7.0644159 2.3748727,7.0096779 Z M 2.9356066,4.2966054 C 3.1929118,4.4591219 3.3273643,4.7074089 3.2577104,4.8378454 3.1882703,4.9678816 2.9072202,4.995638 2.6295652,4.8758929 2.3517695,4.7560871 2.1846216,4.513732 2.2845204,4.3233184 2.3842194,4.1332856 2.6784281,4.134169 2.9356066,4.2966054 Z M 5.1008172,2.5287545 C 5.2049345,2.8123304 5.1618965,3.090897 5.0291491,3.1528416 4.8959297,3.2150063 4.6554636,3.0679703 4.5067904,2.8029284 4.3581949,2.5380252 4.3727259,2.2444867 4.5681139,2.1549104 c 0.1958381,-0.089783 0.42853,0.090116 0.5327033,0.3738441 z m 2.7632482,0.083119 C 7.743965,2.8900085 7.5208323,3.0609858 7.3833247,3.0142594 7.2464151,2.9677361 7.1731991,2.6965103 7.2453576,2.4031303 7.3175524,2.1096029 7.5292422,1.905827 7.7345292,1.9748996 7.9392414,2.0437787 7.9841064,2.3338755 7.8640654,2.6118735 Z M 9.9362482,4.4899726 C 9.6717217,4.6382065 9.3883361,4.6393315 9.3053687,4.5156339 9.2222276,4.3916771 9.3318933,4.1304673 9.5724096,3.9429998 9.8128361,3.7556023 10.106147,3.7254348 10.224316,3.9040902 10.342648,4.0829914 10.200876,4.3416821 9.9362482,4.4899726 Z' fill='#ff0066' transform='translate(4.5, 4.5) scale(2, 2)' opacity='0'>
              <animate attributeName='opacity' dur='.5s' from='0' to='.6' repeatCount='1' fill='freeze' begin='moonAnim.end' />
              <animate attributeName='opacity' dur='.5s' from='.6' to='0' repeatCount='1' fill='freeze' begin='moonAnimReverse.begin' />
            </path>
          </g>
        </g>
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
