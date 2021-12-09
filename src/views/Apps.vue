<template>
  <Devs>
    <v-card-title>
      <h1 class="display-1">애플리케이션</h1>
      <v-spacer />
      <v-btn
        color="deep-purple accent-2"
        class="mx-4"
        height="40"
        depressed
        dark
      >
        추가하기
      </v-btn>
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
import app from "@/graphql/queries/app.gql"

export default defineComponent({
  components: { Devs },

  setup(_, { root }) {
    const state = reactive({
      apps: [],
    })

    onBeforeMount(async () => {
      const { data } = await root.$apollo.mutate({
        mutation: app,
        variables: {
          input: {
            id: root.$route.query.code,
          },
        },
      })

      state.apps = data.app
    })

    return {
      ...toRefs(state),
    }
  },
})
</script>
