module.exports = {
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-react-helmet",
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
