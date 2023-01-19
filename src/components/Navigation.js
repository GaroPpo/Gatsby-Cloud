import React from "react"
import { Link } from "gatsby"

import PersonLogo from '../assets/favicon.png'
import moon from '../assets/moon.png'

import { slugify } from '../utils/helpers'

const mainNavItems = [
  {
    url: '/',
    label: 'Home',
    mobileOnly: true
  },
  {
    url: '/about',
    label: 'About'
  },
  {
    url: '/blog',
    label: 'Blog'
  },
  {
    url: '/projects',
    label: 'Projects'
  },
  {
    url: '/portfolio',
    label: 'Portfolio'
  }
]

export const Navigation = ({ theme, onUpdateTheme }) => {
  return (
    <section className="navigation">
      <div class="container">
        <div className="nav-wrapper">
          <Link to="/" className="item brand">
            <img src={PersonLogo} className="logo" alt="Eric Liputra" />
            <span>Eric Liputra</span>
          </Link>

          <nav>
            {mainNavItems.map((item) => (
              <div className="nav-item-outer" key={item.url}>
                <Link
                  to={item.url}
                  key={item.label}
                  activeClassName="active"
                  className={`item ${slugify(item.label)} ${item.mobileOnly ? 'mobile-only' : ''
                    }`}
                >
                  <span>{item.label}</span>
                </Link>
              </div>
            ))}
          </nav>
        </div>

        <div className="theme-toggle">
          <button onClick={onUpdateTheme}>
            <img src={moon} alt="Theme" />
          </button>
        </div>
      </div>
    </section>
  )
}
