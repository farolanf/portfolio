module.exports = {
  siteMetadata: {
    title: `Farolan Faisal`,
    description: `Personal website of Farolan Faisal, a friendly full stack web developer.`,
    author: `Farolan Faisal`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Farolan Faisal`,
        short_name: `Farol`,
        start_url: `/`,
        background_color: `#FF0000`,
        theme_color: `#00FF00`,
        display: `standalone`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
