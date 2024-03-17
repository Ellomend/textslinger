<template>
  <div class="OptionsView">
    <div class="row">
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="text-h6">Options:</div>
          </q-card-section>

          <q-card-section>
            <SpacesWrapInput :wrap="wrapWithSpaces" @update:wrap="setWrapWithSpaces" />
          </q-card-section>
          <q-separator dark />
        </q-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SpacesWrapInput from '../SpacesWrapInput.vue';
import { useOptions } from 'src/composables/general/useOptions';

export default defineComponent({
  name: 'OptionsView',
  components: {
    SpacesWrapInput
  },
  setup: () => {

    const { wrapWithSpaces, setWrapWithSpaces } = useOptions()

    return {
      wrapWithSpaces,
      setWrapWithSpaces
    }
  }
});
</script>
