<template>
  <v-main>
    <v-layout fill-height align-center justify-center>
      <v-progress-circular indeterminate color="#7f00ff" />
    </v-layout>
  </v-main>
</template>

<script>
import { defineComponent, onBeforeMount } from "@vue/composition-api"
import token from "@/graphql/mutations/token.gql"

export default defineComponent({
  name: "OAuth",

  setup(_, { root }) {
    onBeforeMount(async () => {
      if (root.$route.query.code) {
        try {
          const data = await root.$apollo.mutate({
            mutation: token,
            variables: {
              input: {
                code: root.$route.query.code,
              },
            },
          })

          root.$router.push("/apps")
        } catch {
          root.$router.push("/")
        }
      } else {
        root.$router.push("/")
      }
    })
  },
})
</script>
