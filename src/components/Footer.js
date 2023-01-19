import React from "react"

import config from '../utils/config'

const SocialMedia = [
  {
    text: "Facebook",
    url: "https://www.facebook.com/EricLiputra/"
  },
  {
    text: "Instagram",
    url: "https://www.instagram.com/EricLiputra/",
  },
  {
    text: "GitHub",
    url: "https://www.github.com/GaroPpo/",
  },
  {
    text: "LinkedIn",
    url: "https://www.linkedin.com/in/ericliputra/",
  },
]

export const Footer = () => {
  return (
    <footer className="footer">
      <section>
        <nav>
          <span className="desktop-only"><i class="fa fa-code"></i> with <i class="fa fa-heart"></i> by {config.siteTitle}</span>
          {SocialMedia.map((link) => (
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              key={link.url}
            >
              {link.text}
            </a>
          ))}
        </nav>
        <nav>
          <span class="poweredby">Powered by <a href="https://www.gatsbyjs.com" target="_blank" rel="noopener noreferrer">Gatsby</a> & <a href="https://github.com/" target="_blank" rel="noopener noreferrer">GitHub</a></span>
        </nav>
      </section>
    </footer>
  )
}