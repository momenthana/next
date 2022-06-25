import { init } from '@/lib/alice'
import { startApolloServer } from '@/server'
import typeDefs from '@/graphql/typeDefs'
import resolvers from '@/graphql/resolvers'

init()
  .then(() => {
    startApolloServer(typeDefs, resolvers)
  })
  .catch((error) => {
    console.log('❌ Server start failed')

    console.error(error)
  })
