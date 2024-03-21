<template>
  <div class="ImportExport q-mt-md">
    <q-card>
      <q-card-section class="bg-blue-grey-1">
        <div class="text-h6">
          Export / Import
        </div>
        <div class="text-caption text-grey">
          On import, existing data will <b><u>NOT</u></b> be deleted.
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="row">
          <div class="col-6 flex justify-center items-center">
            <q-btn
              class="q-ma-md"
              color="blue"
              outline
              icon="file_download"
              label="Export"
              @click="exportToFile"
            />
          </div>
          <div class="col-6 flex justify-center items-center">
            <!-- TODO: fix this later -->
            <q-file
              v-model="fileModel"
              outlined
              class="q-ma-md"
              label="Import"
              @update:model-value="importFromFile"
            >
              <template #prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import { useImportExport } from 'src/composables/general/useImportExport'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ImportExport',
  setup() {
    const { exportToFile, importFromFile } = useImportExport()
    const fileModel = ref(null)

    return {
      exportToFile,
      importFromFile,
      fileModel,
    }
  },
})
</script>
