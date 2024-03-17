<template>
  <q-page padding>
    <div class="row">
      <div class="col-12">
        <div>
          <PopupView />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PopupView from 'src/components/views/PopupView.vue'

export default defineComponent({
  name: 'PopupPage',
  components: {
    PopupView,
  },
})
</script>
