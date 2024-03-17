<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { usePersistedState } from 'src/composables/general/usePersistState';
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const { initStoresState } = usePersistedState();

    const initializedFlag = ref<boolean>(false);

    onMounted(() => {
      initStoresState()
        .then(() => {
          initializedFlag.value = true;
        });
    });

    return { initializedFlag };
  },
});
</script>
