import React from "react"
import Helmet from "react-helmet"

import { Layout } from "../components/Layout"
import { SEO } from "../components/SEO"
import config from "../utils/config"

export default function FourOhFour() {
  return (
    <div>
      <Helmet title={`Error 404 Not Found - ${config.siteTitle}`} />
      <SEO />
      <div className="container fourohfour">
        <section className="hero index">
          <h1>😱</h1>
          <p className="hero-description">
            <b>You've found a page that doesn't exist</b>
            <br />
            <br />
            Today, we know that the ocean makes up about 71% of the Earth' surface, and it is the biggest ecosystem of the planet, holding 99% of all habitable space in the world. As much as we try to picture its vastness, however, it remains almost incomprehensible.
            <br />
            🌊🌊🌊
            <br />
            It might be shocking to find out, but <b>ONLY 5%</b> of the ocean has been <b>explored</b> and charted by humans. The rest, especially its depths, are still unknown.
          </p>
        </section>
      </div>
    </div>
  )
}

FourOhFour.Layout = Layout
