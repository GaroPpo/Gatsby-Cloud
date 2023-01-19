import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import config from '../utils/config'

export default function PostTemplate({ tagss = [], data }) {
  const post = data.markdownRemark
  const { tags, categories, title, date, thumbnail } = post.frontmatter

  return (
    <div>
      <Helmet title={`${post.frontmatter.title} - ${config.siteTitle}`} />
      <SEO postPath={post.fields.slug} postNode={post} postSEO />

      <div className="container">
        <div className="article-content">
          <div className="post-header">
            <h2>{title}</h2>
            <time>{date}</time>
          </div>
          <div className="post-featured-image">
            <GatsbyImage image={getImage(thumbnail)} alt="" />
          </div>
          <div
            id={post.fields.slug}
            className="post-content"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </div>
      </div>
    </div>
  )
}

PostTemplate.Layout = Layout

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "DD MMMM YYYY")
        tags
        categories
        thumbnail {
          childImageSharp {
            gatsbyImageData(width: 800)
          }
        }
      }
    }
  }
`