import React, { useState, useEffect } from 'react'
import Helmet from 'react-helmet'

import favicon from '../assets/favicon.png'
import { Navigation } from './Navigation'
import { Footer } from './Footer'

import '../style/style.css'
import '../style/responsive.css'
import '../style/new-moon.css'

export const Layout = ({ children }) => {
  const [theme, setTheme] = useState('dark')

  const onUpdateTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    window.localStorage.setItem('theme', newTheme)
    setTheme(newTheme)
  }

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('theme')

    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  return (
    <div>
      <helmet>
        <link rel="shortcut icon" type="image/png" href={favicon} />
        {theme === 'dark' && (
          <link rel="stylesheet" type="text/css" href="/dark-mode.css" />
        )}
      </helmet>

      <div id="layout" className="layout">
        <Navigation onUpdateTheme={onUpdateTheme} theme={theme} />
        <main>{children}</main >
        <Footer />
      </div>

      <Helmet>
        <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.3/dist/jquery.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js"></script>
      </Helmet>
    </div>
  )
}
