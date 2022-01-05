let devServer

if (process.env.NODE_ENV !== "production") {
  devServer = {
    host: process.env.HOST,
    port: process.env.PORT,
    https: {
      key: require("fs").readFileSync("env/privkey.pem"),
      cert: require("fs").readFileSync("env/fullchain.pem"),
    },
  }
}

module.exports = {
  devServer,
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
