<template>
  <div class="TextForm">
    <q-form class="row" ref="formRef">
      <div class="col-12">
        <q-input autofocus dense outlined v-model="editingText.title" label="Title" :rules="[validateTitle]" />
      </div>
      <div class="col-12">
        <q-input dense outlined v-model="editingText.content" label="Content" type="textarea"
          :rules="[validateContent]" />
      </div>
      <div class="col-12 q-mb-md">
        <SelectCategoryField :text="editingText" @category-select="onCategorySelected" />
      </div>
      <div class="col-12 flex justify-between">
        <q-btn icon="check" outline size="sm" color="green" label="Update" @click="onUpdateClick" v-if="!create" />
        <q-btn icon="add" outline size="sm" color="green" label="Create" @click="onCreateClick" v-if="create" />
        <q-btn icon="delete" outline size="sm" color="red" label="Delete" @click="onDeleteClick" v-if="!create" />
        <q-btn icon="close" outline size="sm" color="grey" label="Cancel" @click="onCancelClick" />
      </div>
    </q-form>
  </div>
</template>

<script lang="ts">
import { useTextEntity } from 'src/composables/general/useTextEntity';
import { CategoryEntity, TextEntity } from 'src/services/TextService/BaseTypes';
import { defineComponent, ref } from 'vue';
import { useValidation } from 'src/composables/general/useValidation';
import { QForm } from 'quasar';
import SelectCategoryField from './SelectCategoryField.vue';

export default defineComponent({
  name: 'TextForm',
  props: {
    text: {
      type: Object as () => TextEntity,
      required: true,
    },
    create: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['close'],
  setup(props, { emit }) {
    const {
      editingText,
      updateTextInStore,
      addTextToStore,
      removeTextFromStore,
    } = useTextEntity(props.text);

    const { validateTitle, validateContent } = useValidation();

    const formRef = ref<QForm | null>(null);

    const onUpdateClick = async () => {
      if (!await validateForm()) return;
      updateTextInStore(editingText.value);
      emit('close');
    };

    const onCreateClick = async () => {
      if (!await validateForm()) return;
      addTextToStore(editingText.value);
      emit('close');
    };
    const onCancelClick = () => {
      emit('close');
    };
    const onDeleteClick = () => {
      removeTextFromStore(props.text);
      emit('close');
    };

    // validate form (validate child fields)
    const validateForm = async (): Promise<boolean> => {
      if (!formRef.value) return false;
      return await formRef.value.validate(true);
    };

    const onCategorySelected = (category: CategoryEntity) => {
      editingText.value.category = category.id === editingText.value.category ? null : category.id;
      if (!props.create) {
        updateTextInStore(editingText.value);
      }
    };

    return {
      editingText,
      onUpdateClick,
      onCreateClick,
      onCancelClick,
      onDeleteClick,
      onCategorySelected,
      validateTitle,
      validateContent,
      formRef,
    };
  },
  components: { SelectCategoryField },
});
</script>
