<template>
  <div class="CategoryForm">
    <div class="row">
      <div class="col-12 q-mb-md q-mt-md">
        <q-input autofocus outlined dense v-model="editedCategory.title" :rules="[validateTitle]" />
      </div>
    </div>
    <div class="row">
      <div class="col-12 flex justify-between">
        <q-btn class="q-mr-md" size="sm" outline color="green" @click="onCreateClicked" label="Create" v-if="create" />
        <q-btn class="q-mr-md" size="sm" outline color="blue" @click="onUpdateClicked" label="Update" v-if="!create" />
        <q-btn class="q-mr-md" size="sm" outline color="red" @click="onDeleteClicked" label="Delete" v-if="!create" />
        <q-btn size="sm" outline color="grey" @click="onCancelClicked" label="Cancel" />
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CategoryEntity } from 'src/services/TextService/BaseTypes';
import { useCategoryEntity } from 'src/composables/general/useCategoryEntity';
import { useValidation } from 'src/composables/general/useValidation';

export default defineComponent({
  name: 'CategoryForm',
  props: {
    category: {
      type: Object as () => CategoryEntity,
      required: true,
    },
    create: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ['cancel'],
  setup(props, { emit }) {
    const {
      addCategoryToStore, updateCategoryInStore, removeCategoryFromStore, categoryFactory,
    } = useCategoryEntity();

    const editedCategory = ref<CategoryEntity>(categoryFactory(props.category));

    const { validateTitle } = useValidation();

    // cancel
    const onCancelClicked = () => {
      emit('cancel');
    };

    const onCreateClicked = () => {
      if (validateTitle(editedCategory.value.title) !== true) return;
      addCategoryToStore(editedCategory.value);
      emit('cancel');
    };

    const onUpdateClicked = () => {
      if (validateTitle(editedCategory.value.title) !== true) return;
      updateCategoryInStore(editedCategory.value);
      emit('cancel');
    };

    const onDeleteClicked = () => {
      removeCategoryFromStore(editedCategory.value.id);
      emit('cancel');
    };

    return {
      editedCategory,
      onCreateClicked,
      onUpdateClicked,
      onDeleteClicked,
      onCancelClicked,
      validateTitle,
    };
  },
});
</script>
