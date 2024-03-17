<template>
  <div class="SpacesWrapInput">
    <q-toggle v-model="wrapValue" label="Wrap text with spaces when copying to clipboard."
      @update:modelValue="handleToggle" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'TextEditorComponent',
  props: {
    wrap: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  emits: ['update:wrap'],
  setup(props, { emit }) {

    const wrapValue = ref(props.wrap);

    watch(() => props.wrap, (newVal) => {
      wrapValue.value = newVal;
    });

    const handleToggle = (value: boolean) => {
      emit('update:wrap', value);
    };

    return { wrapValue, handleToggle };



    return {};
  },
});
</script>