<template>
  <div class="TextForm">
    <q-form
      ref="formRef"
      class="row"
    >
      <div class="col-12">
        <q-input
          v-model="editingText.title"
          autofocus
          dense
          outlined
          label="Title"
          :rules="[validateTitle]"
        />
      </div>
      <div class="col-12">
        <q-input
          v-model="editingText.content"
          dense
          outlined
          label="Content"
          type="textarea"
          :rules="[validateContent]"
        />
      </div>
      <div class="col-12 q-mb-md">
        <SelectCategoryField
          :text="editingText"
          @category-select="onCategorySelected"
        />
      </div>
      <div class="col-12 flex justify-between">
        <q-btn
          v-if="!create"
          icon="check"
          outline
          size="sm"
          color="green"
          label="Update"
          @click="onUpdateClick"
        />
        <q-btn
          v-if="create"
          icon="add"
          outline
          size="sm"
          color="green"
          label="Create"
          @click="onCreateClick"
        />
        <q-btn
          v-if="!create"
          icon="delete"
          outline
          size="sm"
          color="red"
          label="Delete"
          @click="onDeleteClick"
        />
        <q-btn
          icon="close"
          outline
          size="sm"
          color="grey"
          label="Cancel"
          @click="onCancelClick"
        />
      </div>
    </q-form>
  </div>
</template>

<script lang="ts">
import { useTextEntity } from 'src/composables/general/useTextEntity'
import { CategoryEntity, TextEntity } from 'src/services/TextService/BaseTypes'
import { defineComponent, ref } from 'vue'
import { useValidation } from 'src/composables/general/useValidation'
import { QForm } from 'quasar'
import SelectCategoryField from './SelectCategoryField.vue'

export default defineComponent({
  name: 'TextForm',
  components: { SelectCategoryField },
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
    } = useTextEntity(props.text)

    const { validateTitle, validateContent } = useValidation()

    const formRef = ref<QForm | null>(null)

    // validate form (validate child fields)
    const validateForm = async (): Promise<boolean> => {
      if (!formRef.value) return false
      return formRef.value.validate(true)
    }

    const onUpdateClick = async () => {
      if (!await validateForm()) return
      updateTextInStore(editingText.value)
      emit('close')
    }

    const onCreateClick = async () => {
      if (!await validateForm()) return
      addTextToStore(editingText.value)
      emit('close')
    }
    const onCancelClick = () => {
      emit('close')
    }
    const onDeleteClick = () => {
      removeTextFromStore(props.text)
      emit('close')
    }

    const onCategorySelected = (category: CategoryEntity) => {
      editingText.value.category = category.id === editingText.value.category ? null : category.id
      if (!props.create) {
        updateTextInStore(editingText.value)
      }
    }

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
    }
  },
})
</script>
