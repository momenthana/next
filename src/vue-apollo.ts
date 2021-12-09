import Vue from "vue"
import VueApollo from "vue-apollo"
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core"
import { setContext } from "@apollo/client/link/context"
import jwt from "jsonwebtoken"

Vue.use(VueApollo)

const aud = process.env.VUE_APP_REDIRECT_URI?.match(
  /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/
)?.[4]

const httpLink = createHttpLink({
  uri: process.env.VUE_APP_GRAPHQL_URI || "http://localhost/graphql",
  credentials: "include",
})

const authLink = setContext(async (_, { headers }) => {
  headers = { ...headers }

  const accessToken = localStorage.getItem("access_token")

  if (accessToken) {
    const payload: any = jwt.decode(accessToken)

    if (
      payload.iss === "auth.hana.ooo" &&
      payload.aud === aud &&
      payload.exp > Number(new Date()) / 1000
    ) {
      headers.authorization = `Bearer ${accessToken}`
    } else {
      localStorage.removeItem("access_token")
    }
  }

  return { headers }
})

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export default new VueApollo({
  defaultClient: apolloClient,
})
