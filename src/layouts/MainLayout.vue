<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { usePersistedState } from 'src/composables/general/usePersistState'
import { defineComponent, onMounted, ref } from 'vue'
import { useQuasar } from 'quasar'
import { ll } from 'src/services/LoggerService/LoggerService'

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const $q = useQuasar()
    ll(['bex', $q.platform.is.bex])

    const { initStoresState } = usePersistedState()

    const initializedFlag = ref<boolean>(false)

    onMounted(() => {
      initStoresState()
        .then(() => {
          initializedFlag.value = true
        })
    })

    return { initializedFlag }
  },
})
</script>
