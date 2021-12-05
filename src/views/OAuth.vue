<template>
  <v-main>
    <v-layout fill-height align-center justify-center>
      <v-progress-circular indeterminate color="#7f00ff" />
    </v-layout>
  </v-main>
</template>

<script>
import { defineComponent, onBeforeMount } from "@vue/composition-api"

export default defineComponent({
  name: "OAuth",

  setup(_, { root }) {
    onBeforeMount(() => {
      if (root.$route.params.code) console.log(root.$route.params.code)
    })
  },
})
</script>
