const regexExclude404 = /^(?!\/(dev-404-page|404|offline-plugin-app-shell-fallback)).*$/;

module.exports = {
  siteMetadata: {
    siteUrl: "https://taketocollege.com"
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        query: `{
          site {
            siteMetadata {
              siteUrl
            }
          }
          allSitePage(
            filter: {
              path: {
                regex: "${regexExclude404}"
              }
            }
          ) {
            edges {
              node {
                path
              }
            }
          }
        }`
      }
    },
    "gatsby-plugin-lodash",
    "gatsby-plugin-offline",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-5922635-4"
      }
    },
    "gatsby-plugin-netlify" // Must be last in the config.
  ]
};
