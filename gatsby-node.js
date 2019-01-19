const path = require('path');
const _ = require('lodash');
const languages = require('./src/content/i18n/languages');

exports.onCreateNode = ({
  node,
  actions,
  getNode
}) => {
  const {
    createNodeField
  } = actions;

  // Sometimes, optional fields tend to get not picked up by the GraphQL
  // interpreter if not a single content uses it. Therefore, we're putting them
  // through `createNodeField` so that the fields still exist and GraphQL won't
  // trip up. An empty string is still required in replacement to `null`.
  switch (node.internal.type) {
    case 'Mdx':
      {
        const {
          permalink,
          layout,
          primaryTag
        } = node.frontmatter;
        const {
          relativePath
        } = getNode(node.parent);

        let slug = permalink;

        let langInPath = relativePath.match(/\.\w\w\./gi);
        if (langInPath) {
          langInPath = langInPath[0].slice(1, 3);
        }

        if (!slug) {
          slug = `/${relativePath.replace(/.mdx|.md|index/gi, '')}`;
          if (langInPath) {
            slug = slug.replace(`.${langInPath}`, '')
          }
        }

        createNodeField({
          node,
          name: 'id',
          value: node.id || '',
        });


        // Used to generate URL to view this content.
        createNodeField({
          node,
          name: 'langKey',
          value: langInPath || 'en',
        });


        // Used to generate URL to view this content.
        createNodeField({
          node,
          name: 'slug',
          value: slug || '',
        });

        // Used to determine a page layout.
        createNodeField({
          node,
          name: 'layout',
          value: layout || '',
        });

        createNodeField({
          node,
          name: 'primaryTag',
          value: primaryTag || '',
        });
      }
  }
};

exports.createPages = async ({
  graphql,
  actions
}) => {
  const {
    createPage
  } = actions;

  const engResult = await graphql(`
    {
      allMdx(filter: {
        fields: {
          langKey: {eq: "en"}
        }
      }) {
        edges {
          node {
            id
            fileAbsolutePath
            parent {
              ... on File {
                name
                sourceInstanceName
              }
            }
            code {
              scope
            }
            frontmatter {
              title
              tags
              date
              excerpt
              image {
                childImageSharp {
                  fluid(maxWidth: 3720) {
                    aspectRatio
                    base64
                    sizes
                    src
                    srcSet
                  }
                }
              }
              author {
                id
                bio
                avatar {
                  children {
                    ... on ImageSharp {
                      fixed(quality: 100) {
                        src
                      }
                    }
                  }
                }
              }
            }
            fields {
              layout
              slug
              langKey
            }
          }
        }
      }
    }
  `);

  if (engResult.errors) {
    console.error(engResult.errors);
    throw new Error(engResult.errors);
  }

  // Create English post pages
  const engPosts = engResult.data.allMdx.edges;
  engPosts.forEach(({
    node
  }, index) => {
    const {
      slug,
      layout,
      langKey
    } = node.fields;
    const prev = index === 0 ? null : engPosts[index - 1].node;
    const next = index === engPosts.length - 1 ? null : engPosts[index + 1].node;
    const permalink = (langKey === 'en') ? slug : `${langKey}${slug}`

    createPage({
      path: permalink,
      // This will automatically resolve the template to a corresponding
      // `layout` frontmatter in the Markdown.
      //
      // Feel free to set any `layout` as you'd like in the frontmatter, as
      // long as the corresponding template file exists in src/templates.
      // If no template is set, it will fall back to the default `post`
      // template.
      //
      // Note that the template has to exist first, or else the build will fail.
      component: path.resolve(`./src/templates/${layout || 'post'}.tsx`),
      // component: path.resolve("./src/components/PostMDXContent.tsx"),
      // component: node.fileAbsolutePath,
      context: {
        // Data passed to context is available in page queries as GraphQL variables.
        slug,
        langKey,
        prev,
        next,
        primaryTag: node.frontmatter.tags ? node.frontmatter.tags[0] : '',
      },
    });
  });

  const zhResult = await graphql(`
    {
      allMdx(filter: {
        fields: {
          langKey: {eq: "zh"}
        }
      }) {
        edges {
          node {
            id
            fileAbsolutePath
            parent {
              ... on File {
                name
                sourceInstanceName
              }
            }
            code {
              scope
            }
            frontmatter {
              title
              tags
              date
              excerpt
              image {
                childImageSharp {
                  fluid(maxWidth: 3720) {
                    aspectRatio
                    base64
                    sizes
                    src
                    srcSet
                  }
                }
              }
              author {
                id
                bio
                avatar {
                  children {
                    ... on ImageSharp {
                      fixed(quality: 100) {
                        src
                      }
                    }
                  }
                }
              }
            }
            fields {
              layout
              slug
              langKey
            }
          }
        }
      }
    }
  `);

  if (zhResult.errors) {
    console.error(zhResult.errors);
    throw new Error(zhResult.errors);
  }


  // Create ZhongWen post pages
  const zhPosts = zhResult.data.allMdx.edges;
  zhPosts.forEach(({
    node
  }, index) => {
    const {
      slug,
      layout,
      langKey
    } = node.fields;
    const prev = index === 0 ? null : zhPosts[index - 1].node;
    const next = index === zhPosts.length - 1 ? null : zhPosts[index + 1].node;
    const permalink = (langKey === 'en') ? slug : `${langKey}${slug}`

    createPage({
      path: permalink,
      // This will automatically resolve the template to a corresponding
      // `layout` frontmatter in the Markdown.
      //
      // Feel free to set any `layout` as you'd like in the frontmatter, as
      // long as the corresponding template file exists in src/templates.
      // If no template is set, it will fall back to the default `post`
      // template.
      //
      // Note that the template has to exist first, or else the build will fail.
      component: path.resolve(`./src/templates/${layout || 'post'}.tsx`),
      // component: path.resolve("./src/components/PostMDXContent.tsx"),
      // component: node.fileAbsolutePath,
      context: {
        // Data passed to context is available in page queries as GraphQL variables.
        slug,
        langKey,
        prev,
        next,
        primaryTag: node.frontmatter.tags ? node.frontmatter.tags[0] : '',
      },
    });
  });

  // Create tag pages
  const tagTemplate = path.resolve('./src/templates/tags.tsx');
  const tags = _.uniq(
    _.flatten(
      _.concat(
        engResult.data.allMdx.edges.map(edge => {
          return _.castArray(_.get(edge, 'node.frontmatter.tags', []));
        }),
        zhResult.data.allMdx.edges.map(edge => {
          return _.castArray(_.get(edge, 'node.frontmatter.tags', []));
        }),
      )
    ),
  );
  tags.forEach(tag => {
    languages.langs.map(langKey => {
      switch (langKey) {
        case 'zh':
          {
            createPage({
              path: `/zh/tags/${_.kebabCase(tag)}/`,
              component: tagTemplate,
              context: {
                tag,
                slug: `/tags/${_.kebabCase(tag)}/`,
                langKey,
              },
            });
            break;
          }
        default:
          {
            createPage({
              path: `/tags/${_.kebabCase(tag)}/`,
              component: tagTemplate,
              context: {
                tag,
                slug: `/tags/${_.kebabCase(tag)}/`,
                langKey: "en",
              },
            });
          }
      }
    })
  });

  const Meta = await graphql(`
    {
      allAuthorYaml {
        edges {
          node {
            id
          }
        }
      }
      allTechstackYaml {
        edges {
          node {
            id
          }
        }
      }
    }
  `);

  if (Meta.errors) {
    console.error(Meta.errors);
    throw new Error(Meta.errors);
  }
  // Create author pages
  const authorTemplate = path.resolve('./src/templates/author.tsx');

  Meta.data.allAuthorYaml.edges.forEach(edge => {
    languages.langs.map(langKey => {
      switch (langKey) {
        case 'zh':
          {
            createPage({
              path: `/zh/author/${_.kebabCase(edge.node.id)}/`,
              component: authorTemplate,
              context: {
                slug: `/author/${edge.node.id}`,
                author: edge.node.id,
                langKey,
              },
            });
            break;
          }
        default:
          {
            createPage({
              path: `/author/${_.kebabCase(edge.node.id)}/`,
              component: authorTemplate,
              context: {
                slug: `/author/${edge.node.id}`,
                author: edge.node.id,
                langKey: 'en'
              },
            });
          }
      }
    })
  });

  // Create tech pages
  const techTemplate = path.resolve('./src/templates/tech.tsx');
  Meta.data.allTechstackYaml.edges.forEach(edge => {
    languages.langs.map(langKey => {
      switch (langKey) {
        case 'zh':
          {
            createPage({
              path: `/zh/tech/${_.kebabCase(edge.node.id)}/`,
              component: techTemplate,
              context: {
                slug: `/tech/${_.kebabCase(edge.node.id)}/`,
                tech: edge.node.id,
                langKey,
              },
            });
            break;
          }
        default:
          {
            createPage({
              path: `/tech/${_.kebabCase(edge.node.id)}/`,
              component: techTemplate,
              context: {
                slug: `/tech/${_.kebabCase(edge.node.id)}/`,
                tech: edge.node.id,
                langKey: 'en'
              },
            });
          }
      }
    })
  });

};

exports.onCreateWebpackConfig = ({
  stage,
  actions
}) => {
  // adds sourcemaps for tsx in dev mode
  if (stage === `develop` || stage === `develop-html`) {
    actions.setWebpackConfig({
      devtool: 'eval-source-map',
    });
  }
};