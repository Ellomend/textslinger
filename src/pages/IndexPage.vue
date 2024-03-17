<template>
  <q-page padding>
    <div class="IndexPage">
      <q-card>
        <q-card-section>
          <PopupView />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import PopupView from 'src/components/views/PopupView.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage',
  components: { PopupView },
  setup() {
    return {}
  },
})
</script>
