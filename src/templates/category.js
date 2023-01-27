import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import { Posts } from '../components/Posts'
import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'

export default function CategoryTemplate({ data, pageContext }) {
  let { category } = pageContext
  const posts = data.allMarkdownRemark.edges
  const simplifiedPosts = useMemo(() => getSimplifiedPosts(posts), [posts])

  return (
    <div>
      <Helmet title={`${category} | ${config.siteTitle}`} />
      <SEO />

      <div className="container">
        <div className="article-content">
          <header className="hero">
            <h1>{category}</h1>
          </header>
          <Posts data={simplifiedPosts} showYears />
        </div>
      </div>
    </div>
  )
}

CategoryTemplate.Layout = Layout

export const pageQuery = graphql`
  query CategoryPage($category: String) {
    allMarkdownRemark(
      sort: {frontmatter: {date: DESC}}
      filter: {frontmatter: {categories: {in: [$category]}}}
    ) {
      totalCount
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "DD MMMM YYYY")
            tags
            categories
          }
        }
      }
    }
  }
`
