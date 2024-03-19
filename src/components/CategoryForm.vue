<template>
  <div class="CategoryForm">
    <div class="row">
      <div class="col-12 q-mb-md q-mt-md">
        <q-input
          v-model="editedCategory.title"
          autofocus
          outlined
          dense
          :rules="[validateTitle]"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12 flex justify-between">
        <q-btn
          v-if="create"
          class="q-mr-md"
          size="sm"
          outline
          color="green"
          label="Create"
          @click="onCreateClicked"
        />
        <q-btn
          v-if="!create"
          class="q-mr-md"
          size="sm"
          outline
          color="blue"
          label="Update"
          @click="onUpdateClicked"
        />
        <q-btn
          v-if="!create"
          class="q-mr-md"
          size="sm"
          outline
          color="red"
          label="Delete"
          @click="onDeleteClicked"
        />
        <q-btn
          size="sm"
          outline
          color="grey"
          label="Cancel"
          @click="onCancelClicked"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { CategoryEntity } from 'src/services/TextService/BaseTypes'
import { useCategoryEntity } from 'src/composables/general/useCategoryEntity'
import { useValidation } from 'src/composables/general/useValidation'

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
  emits: ['close'],
  setup(props, { emit }) {
    const {
      addCategoryToStore,
      updateCategoryInStore,
      removeCategoryFromStore,
      createCategory,
    } = useCategoryEntity()

    const editedCategory = ref<CategoryEntity>(createCategory(props.category))

    const { validateTitle } = useValidation()

    // cancel
    const onCancelClicked = () => {
      emit('close')
    }

    const onCreateClicked = () => {
      if (validateTitle(editedCategory.value.title) !== true) return
      addCategoryToStore(editedCategory.value)
      emit('close')
    }

    const onUpdateClicked = () => {
      if (validateTitle(editedCategory.value.title) !== true) return
      updateCategoryInStore(editedCategory.value)
      emit('close')
    }

    const onDeleteClicked = () => {
      removeCategoryFromStore(editedCategory.value.id)
      emit('close')
    }

    return {
      editedCategory,
      onCreateClicked,
      onUpdateClicked,
      onDeleteClicked,
      onCancelClicked,
      validateTitle,
    }
  },
})
</script>
