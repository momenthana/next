<template>
  <v-main>
    <v-navigation-drawer app dark floating permanent>
      <v-list nav class="ma-4">
        <v-list-item-group active-class="deep-purple accent-4">
          <v-list-item v-for="item in list" :key="item.title" :to="item.link">
            <v-list-item-content>
              <v-list-item-title class="mx-2">
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-container fluid>
      <slot />
    </v-container>
  </v-main>
</template>

<script>
import { defineComponent, reactive, toRefs } from "@vue/composition-api"

export default defineComponent({
  setup() {
    const state = reactive({
      list: [{ title: "애플리케이션", link: "/apps" }],
    })

    return { ...toRefs(state) }
  },
})
</script>
