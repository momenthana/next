module.exports = {
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.gql$/,
          use: "graphql-tag/loader",
        },
      ],
    },
  },
}
