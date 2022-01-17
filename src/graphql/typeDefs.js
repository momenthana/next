import path from 'path'
import { mergeTypeDefs } from '@graphql-tools/merge'
import { loadFilesSync } from '@graphql-tools/load-files'

const typeDefs = loadFilesSync(path.join(__dirname, '/**/*.gql'))

export default mergeTypeDefs(typeDefs)
