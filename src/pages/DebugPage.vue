<template>
  <q-page>
    <div class="row">
      <div class="col-12">
        <PopupView />
      </div>
      <div class="col-12">
        <OptionsVIew />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import OptionsVIew from 'src/components/views/OptionsVIew.vue';
import PopupView from 'src/components/views/PopupView.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DebugPage',
  components: {
    OptionsVIew,
    PopupView,
  },
});
</script>
