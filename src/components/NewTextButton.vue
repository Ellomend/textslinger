<template>
  <div class="NewTextButton">
    <q-btn
      color="green"
      size="sm"
      outline
      icon="add"
      @click="openDialog = true"
    />
    <div>
      <q-dialog v-model="openDialog">
        <q-card>
          <q-card-section>
            <TextForm
              :text="newText"
              :create="true"
              @close="onClose"
            />
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { useTextEntity } from 'src/composables/general/useTextEntity'
import { defineComponent, ref } from 'vue'
import { TextEntity } from 'src/services/TextService/BaseTypes'
import TextForm from './TextForm.vue'

export default defineComponent({
  name: 'NewTextButton',
  components: { TextForm },
  setup() {
    const { addTextToStore, textFactory } = useTextEntity(null)

    const openDialog = ref<boolean>(false)
    const newText = ref<TextEntity>(textFactory({
      title: '',
      content: '',
    }))

    const onClose = () => {
      openDialog.value = false
      newText.value = textFactory({
        title: '',
        content: '',
      })
    }

    return {
      newText,
      onClose,
      openDialog,
      addTextToStore,
    }
  },
})
</script>
