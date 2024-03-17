<template>
  <div>
    <TextItemExpandableCard v-for="text in texts" :key="text.id" :text="text" />
  </div>
</template>

<script lang="ts">
import { TextEntity } from 'src/services/TextService/BaseTypes';
import { defineComponent } from 'vue';
import TextItemExpandableCard from './TextItemExpandableCard.vue';

export default defineComponent({
  name: 'TextList',
  components: { TextItemExpandableCard },
  props: {
    texts: Object as () => TextEntity[],
  },
});
</script>
