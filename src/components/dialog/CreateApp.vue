<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="deep-purple accent-2"
        class="mx-4"
        height="40"
        depressed
        dark
        v-bind="attrs"
        v-on="on"
      >
        추가하기
      </v-btn>
    </template>

    <v-card>
      <v-card-title>애플리케이션 만들기</v-card-title>

      <v-card-text>
        <v-text-field v-model="name" label="이름" outlined />
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn color="orange" text @click="dialog = false">취소</v-btn>
        <v-btn color="deep-purple accent-2" dark depressed @click="create">
          추가
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { defineComponent, reactive, toRefs } from "@vue/composition-api"
import createApp from "@/graphql/mutations/createApp.gql"

export default defineComponent({
  setup(_, { root, emit }) {
    const state = reactive({
      dialog: false,
      name: "",
    })

    const create = async () => {
      const { data } = await root.$apollo.mutate({
        mutation: createApp,
        variables: {
          input: {
            name: state.name,
          },
        },
      })

      state.dialog = false

      emit("update")
    }

    return {
      ...toRefs(state),
      create,
    }
  },
})
</script>
