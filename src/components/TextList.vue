<template>
  <div>
    <q-scroll-area
      :thumb-style="thumbStyle"
      :bar-style="barStyle"
      style="height: 430px;"
      class="q-pr-md"
    >
      <TextItemExpandableCard
        v-for="text in texts"
        :key="text.id"
        :text="text"
      />
    </q-scroll-area>
  </div>
</template>

<script lang="ts">
import { TextEntity } from 'src/services/TextService/BaseTypes'
import { defineComponent } from 'vue'
import TextItemExpandableCard from './TextItemExpandableCard.vue'

export default defineComponent({
  name: 'TextList',
  components: { TextItemExpandableCard },
  props: {
    texts: {
      type: Object as () => TextEntity[],
      required: true,
    },
  },
  setup() {
    const thumbStyle = {
      right: '4px',
      borderRadius: '5px',
      backgroundColor: '#027be3',
      width: '5px',
      opacity: 0.75,
    }
    const barStyle = {
      right: '2px',
      borderRadius: '9px',
      backgroundColor: '#027be3',
      width: '9px',
      opacity: 0.2,
    }
    return { thumbStyle, barStyle }
  },
})
</script>
