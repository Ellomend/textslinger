<template>
  <div class="NewTextButton">
    <q-btn color="green" size="sm" outline icon="add" @click="openDialog = true" />
    <div>
      <q-dialog v-model="openDialog">
        <q-card>
          <q-card-section>
            <TextForm :text="newText" @close="onClose" :create="true" />
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { useTextEntity } from 'src/composables/general/useTextEntity';
import { defineComponent, ref } from 'vue';
import TextForm from './TextForm.vue';
import { TextEntity } from 'src/services/TextService/BaseTypes';

export default defineComponent({
  name: 'NewTextButton',
  setup() {

    const { addTextToStore, textFactory } = useTextEntity(null);

    const openDialog = ref<boolean>(false);
    const newText = ref<TextEntity>(textFactory({
      title: '',
      content: ''
    }))

    const onClose = () => {
      openDialog.value = false;
      newText.value = textFactory({
        title: '',
        content: ''
      })
    };

    return {
      newText,
      onClose,
      openDialog,
      addTextToStore
    };
  },
  components: { TextForm }
});
</script>
