<template>
  <q-page padding>
    <div class="row">
      <div class="col-12">
        <OptionsView />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import OptionsView from '../components/views/OptionsVIew.vue'

export default defineComponent({
  name: 'OptionsPage',
  components: { OptionsView },
})
</script>
