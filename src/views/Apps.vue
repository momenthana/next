<template>
  <Devs>
    <v-card-title>
      <h1 class="display-1">애플리케이션</h1>
      <v-spacer />
      <CreateApp @update="getApps" />
      <v-avatar color="orange" size="40" />
    </v-card-title>
    <v-card-text>
      새 애플리케이션을 만들어 시작합니다. 우리는 당신이 무엇을 만드는지 너무
      보고 싶어요!
    </v-card-text>
    <v-card-title>내 애플리케이션</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="6" sm="4" md="3" lg="2" v-for="(app, i) in apps" :key="i">
          <v-card flat :to="`/apps/${app.clientId}`">
            <v-card flat color="orange">
              <v-img aspect-ratio="1" :src="app.src" />
            </v-card>

            <v-card-actions>
              <span
                class="mx-auto font-weight-bold text-no-wrap"
                style="overflow: hidden; text-overflow: ellipsis"
              >
                {{ app.name }}
              </span>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </Devs>
</template>

<script>
import {
  defineComponent,
  onBeforeMount,
  reactive,
  toRefs,
} from "@vue/composition-api"
import Devs from "@/components/Devs.vue"
import CreateApp from "@/components/dialog/CreateApp.vue"
import app from "@/graphql/queries/app.gql"

export default defineComponent({
  components: { Devs, CreateApp },

  setup(_, { root }) {
    const state = reactive({
      apps: [],
    })

    const getApps = async () => {
      const { data } = await root.$apollo.mutate({
        mutation: app,
      })

      state.apps = data.app
    }

    onBeforeMount(async () => {
      getApps()
    })

    return {
      ...toRefs(state),
      getApps,
    }
  },
})
</script>
