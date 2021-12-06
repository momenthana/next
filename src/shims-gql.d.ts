declare module "*.gql" {
  import { DocumentNode } from "graphql"
  const documentNode: DocumentNode
  export default documentNode
}
