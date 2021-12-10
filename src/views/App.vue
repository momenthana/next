<template>
  <Devs>
    <v-card-title>
      <h1 class="display-1">일반 정보</h1>
      <v-spacer />
      <CreateApp @update="getApps" />
      <v-avatar color="orange" size="40" />
    </v-card-title>
    <v-card-text>
      당신의 애플리케이션을 뭐라고 불러야 할까요? 어떤 놀라운 일을 합니까? 어떤
      아이콘이 표시되어야 하나요? 여기에서 알려주세요!
    </v-card-text>
    <v-card-text>
      <v-row>
        <v-col cols="6" sm="4" md="3" lg="2">
          <v-card flat color="orange">
            <v-img aspect-ratio="1" :src="app.src" />
          </v-card>
        </v-col>
        <v-col cols="12" sm="8" md="9" lg="10">
          <v-text-field v-model="app.name" label="이름" outlined />

          <v-textarea v-model="app.desc" label="설명" outlined no-resize />

          <v-text-field
            v-model="app.clientId"
            label="애플리케이션 ID"
            outlined
            readonly
          />
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

  props: { clientId: String },

  setup(props, { root }) {
    const state = reactive({
      app: {},
    })

    const getApps = async () => {
      const { data } = await root.$apollo.mutate({
        mutation: app,
        variables: {
          input: {
            clientId: props.clientId,
          },
        },
      })

      state.app = data.app[0]
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
