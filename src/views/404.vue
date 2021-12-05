<template>
  <v-main>
    <v-layout fill-height align-center justify-center>
      <v-card flat width="250">
        <v-card-title>404</v-card-title>

        <v-card-subtitle>Page Not Found</v-card-subtitle>

        <v-card-actions>
          <v-btn depressed @click="home">home</v-btn>

          <v-spacer />

          <v-btn color="#7f00ff" dark depressed @click="back">back</v-btn>
        </v-card-actions>
      </v-card>
    </v-layout>
  </v-main>
</template>

<script>
import { defineComponent } from "@vue/composition-api"

export default defineComponent({
  name: "404",

  setup(_, { root }) {
    const home = () => {
      root.$router.push("/")
    }

    const back = () => {
      root.$router.go(-1)
    }

    return {
      home,
      back,
    }
  },
})
</script>
