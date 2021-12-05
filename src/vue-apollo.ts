import Vue from "vue"
import VueApollo from "vue-apollo"
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core"
import { setContext } from "@apollo/client/link/context"

Vue.use(VueApollo)

const httpLink = createHttpLink({
  uri: process.env.VUE_APP_GRAPHQL_URI || "http://localhost/graphql",
  credentials: "include",
})

const authLink = setContext(async (_, { headers }) => {
  return { headers }
})

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export default new VueApollo({
  defaultClient: apolloClient,
})
