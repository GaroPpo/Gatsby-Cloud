import React from 'react'
import Helmet from 'react-helmet'
import { Link } from 'gatsby'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import config from '../utils/config'
import { projectsList } from '../data/projectsList'

export default function Projects() {
  const title = 'Projects'
  const description = 'Stuff I made that related to Programming'

  return (
    <div>
      <Helmet title={`${title} - ${config.siteTitle}`} />
      <SEO customDescription={description} />

      <div className="container">
        <div className="article-content">
          <header className="hero">
            <h1>{title}</h1>
          </header>
        </div>
      </div>

      <section className="segment project">
        <div className="container">
          <div className="post-preview">
            {projectsList.map((project) => {
              return (
                <div className="anchored card" key={project.slug}>
                  <div>
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
                  </div>
                  <div className="anchored links">
                    {project.writeup && (
                      <Link className="button small" to={project.writeup}>
                        Article
                      </Link>
                    )}
                    {project.url && (
                      <a
                        className="button small flex"
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        GitHub <i class="fa fa-external-link" aria-hidden="true"></i>
                      </a>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

Projects.Layout = Layout
