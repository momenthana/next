<template>
  <v-app-bar fixed flat dark color="transparent">
    <v-toolbar-title>
      <b>Hana</b>
      Dev
    </v-toolbar-title>

    <v-spacer />

    <v-btn light x-large height="40" depressed @click="signIn">로그인</v-btn>
  </v-app-bar>
</template>

<script>
import { defineComponent, onBeforeMount } from "@vue/composition-api"
import Hana from "hana.js"

export default defineComponent({
  setup() {
    const signIn = () => {
      Hana.Auth.authorize({
        redirectUri: process.env.VUE_APP_REDIRECT_URI,
      })
    }

    onBeforeMount(() => {
      Hana.init({ clientId: process.env.VUE_APP_CLIENT_ID })
    })

    return {
      signIn,
    }
  },
})
</script>
