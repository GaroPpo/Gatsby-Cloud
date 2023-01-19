import React, { useMemo } from 'react'
import { Link } from 'gatsby'

import { getFormattedDate } from '../utils/helpers'

export const Post = ({ node, prefix, newspaper }) => {
  let formattedDate

  if (node.date) {
    if (!newspaper) {
      const dateArr = node.date.split(' ')
      dateArr.pop()

      dateArr[0] = dateArr[0].slice(0, 3)
      formattedDate = dateArr.join(' ')
    } else {
      formattedDate = getFormattedDate(node.date)
    }
  }

  return (
    <Link
      to={prefix ? `/${prefix}/${node.slug}` : `${node.slug}`}
      key={node.id}
      className="post"
    >
      <time>{formattedDate}</time>
      <span class="seperate">&raquo;</span>
      <h3>{node.title}</h3>
    </Link>
  )
}

export const Posts = ({
  data = [],
  showYears,
  query,
  prefix,
  hideDate,
  yearOnly,
  ...props
}) => {
  const postsByYear = useMemo(() => {
    const collection = {}

    data.forEach((post) => {
      const year = post.date.substr(-4)

      collection[year] = [...(collection[year] || []), post]
    })

    return collection
  }, [data])
  const years = useMemo(() => Object.keys(postsByYear).reverse(), [postsByYear])

  if (showYears) {
    return years.map((year) => (
      <section key={year} className="segment">
        <h2 className="year">{year}</h2>
        <div className="posts">
          {postsByYear[year].map((node) => (
            <Post key={node.id} node={node} query={query} prefix={prefix} />
          ))}
        </div>
      </section>
    ))
  } else {
    return (
      <div className={props.newspaper ? 'posts newspaper' : 'posts'}>
        {data.map((node) => (
          <Post
            key={node.id}
            node={node}
            query={query}
            prefix={prefix}
            hideDate={hideDate}
            yearOnly={yearOnly}
            {...props}
          />
        ))}
      </div>
    )
  }
}