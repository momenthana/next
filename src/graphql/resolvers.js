import path from 'path'
import { mergeResolvers } from '@graphql-tools/merge'
import { loadFilesSync } from '@graphql-tools/load-files'

const queryResolvers = loadFilesSync(path.join(__dirname, '/queries/*/resolver.js'))
const mutationResolvers = loadFilesSync(path.join(__dirname, '/mutations/*/resolver.js'))

export default {
  Query: mergeResolvers(queryResolvers),
  Mutation: mergeResolvers(mutationResolvers)
}
