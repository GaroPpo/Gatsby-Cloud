import React, { useMemo, useEffect, useRef } from 'react'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Lottie from 'lottie-web'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import { Posts } from '../components/Posts'
import { projectsList } from '../data/projectsList'
import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'

export default function Index({ data }) {
  const latest = data.latest.edges
  const simplifiedLatest = useMemo(() => getSimplifiedPosts(latest), [latest])
  const lottieanimation = useRef(null)

  useEffect(() => {
    Lottie.loadAnimation({
      container: lottieanimation.current,
      renderer: 'svg',
      loop: true,
      animationData: require('../assets/animation.json'),
      rendererSettings: {
        preserveAspectRatio: 'xMinYMin',
        className: 'Lottie-SVG',
      }
    })
  }, [])

  return (
    <div>
      <Helmet title={config.siteTitle} />
      <SEO />

      <div className="container">
        <section className="hero index">
          <h1>Hey, I'm Eric Liputra</h1>
          <p className="hero-description">
            Welcome to my <b>Digital Home</b>.
            <br />
            <br />
            I'm an undergraduate studying Computer Science from Indonesia. This website is a place where I share about myself, and my writing and most of it is the documentation of my personal experience in the field of computer science.
          </p>
        </section>

        <div className="Lottie-Animation" ref={lottieanimation} />

        <section className="segment last-post">
          <h2 className="home-heading">
            <div className="title">Latest Post</div>
            <a className="button small" href="/blog/">View all</a>
          </h2>
          <Posts data={simplifiedLatest} newspaper />
        </section>

        <section className="segment project">
          <h2 className="home-heading">
            <div className="title">Project</div>
            <a className="button small" href="/project/">View all</a>
          </h2>

          <div className="post-preview">
            {projectsList
              .filter((project) => project.highlight)
              .map((project) => {
                return (
                  <div className="anchored card" key={project.slug}>
                    <time>{project.date}</time>
                    <a
                      className="card-header"
                      href={`https://github.com/GaroPpo/${project.slug}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {project.name}
                    </a>
                    <p>{project.tagline}</p>
                    <div className="anchored links">
                      {project.writeup && (
                        <Link className="button" to={project.writeup}>
                          Article
                        </Link>
                      )}
                      <a className="button flex" href={project.url} target="_blank" rel="noopener noreferrer">
                        GitHub <i class="fa fa-external-link" aria-hidden="true"></i>
                      </a>
                    </div>
                  </div>
                )
              })}
          </div>
        </section>
      </div>
    </div>
  )
}

Index.Layout = Layout

export const pageQuery = graphql`
  query IndexQuery {
    latest: allMarkdownRemark(
      limit: 6
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { template: { eq: "post" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM YYYY")
            title
            tags
            categories
          }
        }
      }
    }
  }
`