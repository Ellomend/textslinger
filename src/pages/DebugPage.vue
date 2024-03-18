<template>
  <q-page>
    <div class="row">
      <div class="col-12">
        <DebugView />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import DebugView from 'src/components/views/DebugView.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DebugPage',
  components: {
    DebugView,
  },
})
</script>
