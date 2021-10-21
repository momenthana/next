<template>
  <Devs>
    <v-card flat>
      <v-card-title>애플리케이션</v-card-title>
      <v-card-subtitle>
        새 애플리케이션을 만들어 시작합니다. 우리는 당신이 무엇을 만드는지 너무
        보고 싶어요!
      </v-card-subtitle>
    </v-card>
  </Devs>
</template>

<script>
import { defineComponent } from "@vue/composition-api"
import Devs from "@/components/Devs.vue"

export default defineComponent({
  components: { Devs },

  setup() {
    return {}
  },
})
</script>
