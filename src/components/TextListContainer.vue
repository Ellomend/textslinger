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
import { useTextsStore } from 'src/stores/texts-store';
import { defineComponent, computed } from 'vue';
import TextList from './TextList.vue';
import NewTextButton from './NewTextButton.vue';

export default defineComponent({
  name: 'TextListContainer',
  components: { TextList, NewTextButton },
  setup() {
    const textsStore = useTextsStore();
    const filteredTexts = computed(() => textsStore.listTexts);
    return { filteredTexts };
  },
});
</script>
