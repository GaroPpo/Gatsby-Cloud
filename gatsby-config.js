module.exports = {
  siteMetadata: {
    title: 'Eric Liputra',
    author: {
      name: 'Eric Liputra',
    },
    pathPrefix: '/',
    siteUrl: 'https://www.ericliputra.com',
    description:
      'Software engineer and open-source creator. This is my digital garden.',
    logo: 'https://www.ericliputra.com/logo.png',
  },
  plugins: [

    // ===================================================================================
    // Netlify
    // ===================================================================================
    'gatsby-plugin-netlify',

    // ===================================================================================
    // Meta
    // ===================================================================================
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Eric Liputra',
        short_name: 'Eric Liputra',
        description:
          'Software engineer and open source creator. This is my digital garden.',
        start_url: '/',
        background_color: 'white',
        theme_color: '#6b76f3',
        display: 'minimal-ui',
        icon: `static/logo.png`,
      },
    },

    // ===================================================================================
    // Images and static
    // ===================================================================================

    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'assets',
        path: `${__dirname}/static/`,
      },
    },

    // ===================================================================================
    // Markdown
    // ===================================================================================

    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-autolink-headers',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 800,
              linkImagesToOriginal: false,
              backgroundColor: 'transparent',
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
              prompt: {
                user: 'root',
                host: 'localhost',
                global: true,
              },
            },
          },
        ],
      },
    },

    // ===================================================================================
    // Search
    // ===================================================================================

    {
      resolve: 'gatsby-plugin-local-search',
      options: {
        name: 'pages',
        engine: 'flexsearch',
        engineOptions: {
          encode: 'icase',
          tokenize: 'forward',
          async: false,
        },
        query: `
          {
            allMarkdownRemark(filter: { frontmatter: { template: { eq: "post" } } }) {
              nodes {
                id
                frontmatter {
                  title
                  categories
                  tags
                  slug
                  date(formatString: "MMMM DD, YYYY")
                }
                rawMarkdownBody
              }
            }
          }
        `,
        ref: 'id',
        index: ['title', 'tags'],
        store: ['id', 'slug', 'title', 'tags', 'date'],
        normalizer: ({ data }) =>
          data.allMarkdownRemark.nodes.map((node) => ({
            id: node.id,
            slug: `/${node.frontmatter.slug}`,
            title: node.frontmatter.title,
            body: node.rawMarkdownBody,
            tags: node.frontmatter.tags,
            categories: node.frontmatter.categories,
            date: node.frontmatter.date,
          })),
      },
    },
  ],
}
