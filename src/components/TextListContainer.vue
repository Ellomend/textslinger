<template>
  <div>
    <div class="row">
      <div class="col-12 q-pb-sm">
        <NewTextButton />
      </div>
      <div class="col-12">
        <TextList :texts="filteredTexts" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useTextEntity } from 'src/composables/general/useTextEntity'
import TextList from './TextList.vue'
import NewTextButton from './NewTextButton.vue'

export default defineComponent({
  name: 'TextListContainer',
  components: { TextList, NewTextButton },
  setup() {
    const { filteredTexts } = useTextEntity()
    return { filteredTexts }
  },
})
</script>
