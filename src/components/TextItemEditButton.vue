<template>
  <div class="TextItemEditButton">
    <q-btn
      color="blue"
      icon="edit"
      size="xs"
      outline
      @click="toggleDialog"
    />
    <div>
      <q-dialog v-model="showDialog">
        <q-card>
          <q-card-section>
            <TextForm
              :text="text"
              @close="onCloseClicked"
            />
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { TextEntity } from 'src/services/TextService/BaseTypes'
import { defineComponent, ref } from 'vue'
import TextForm from './TextForm.vue'

export default defineComponent({
  name: 'TextItemEditButton',
  components: { TextForm },
  props: {
    text: {
      type: Object as () => TextEntity,
      required: true,
    },
  },
  setup() {
    const showDialog = ref<boolean>(false)

    const toggleDialog = () => {
      showDialog.value = true
    }

    const onCloseClicked = () => {
      showDialog.value = false
    }

    return { toggleDialog, showDialog, onCloseClicked }
  },
})
</script>
