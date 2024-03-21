<template>
  <div class="OptionsView">
    <div class="row">
      <div class="col-12">
        <!-- TODO: fix markup here -->
        <q-card>
          <q-card-section class="bg-blue-grey-1">
            <div class="text-h6">
              Wrap text
            </div>
          </q-card-section>

          <q-card-section>
            <SpacesWrapInput
              :wrap="wrapWithSpaces"
              @update:wrap="setWrapWithSpaces"
            />
          </q-card-section>
        </q-card>
        <ImportExport />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useOptions } from 'src/composables/general/useOptions'
import SpacesWrapInput from '../SpacesWrapInput.vue'
import ImportExport from '../ImportExport.vue'

export default defineComponent({
  name: 'OptionsView',
  components: {
    SpacesWrapInput,
    ImportExport,
  },
  setup: () => {
    const { wrapWithSpaces, setWrapWithSpaces } = useOptions()

    return {
      wrapWithSpaces,
      setWrapWithSpaces,
    }
  },
})
</script>
