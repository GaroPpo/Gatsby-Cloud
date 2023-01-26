import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import { Layout } from '../components/Layout'
import { Posts } from '../components/Posts'
import { SEO } from '../components/SEO'
import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'

export default function Blog({ data }) {
  const posts = data.posts.edges
  const simplifiedPosts = useMemo(() => getSimplifiedPosts(posts), [posts])
  const title = 'Blog'
  const description = 'Notes & tutorials'

  return (
    <div>
      <Helmet title={`${title} | ${config.siteTitle}`} />
      <SEO customDescription={description} />

      <div className="container">
        <div className="article-content">
          <header className="hero">
            <h1>{title}</h1>
          </header>
          <Posts data={simplifiedPosts} showYears />
        </div>
      </div>
    </div>
  )
}

Blog.Layout = Layout

export const blogQuery = graphql`
  query BlogQuery {
    posts: allMarkdownRemark(
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
