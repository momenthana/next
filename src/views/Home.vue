<template>
  <v-main>
    <v-sheet height="300" color="#7f00ff">
      <AppBar />
    </v-sheet>
  </v-main>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api"
import AppBar from "@/components/AppBar.vue"

export default defineComponent({
  name: "Home",

  components: {
    AppBar,
  },
})
</script>
