<template>
  <div
    v-if="selectedCategory"
    class="CategoryEdit"
  >
    <q-btn
      size="sm"
      outline
      color="primary"
      icon="edit"
      @click="openDialog = true"
    />
    <q-dialog v-model="openDialog">
      <q-card class="less-screen">
        <q-card-section class="q-pt-none">
          <CategoryForm
            :category="selectedCategory"
            @cancel="onCloseEvent"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useCategoryEntity } from 'src/composables/general/useCategoryEntity'
import CategoryForm from './CategoryForm.vue'

export default defineComponent({
  name: 'CategoryEdit',
  components: { CategoryForm },
  setup() {
    const openDialog = ref<boolean>(false)

    const onCloseEvent = () => {
      openDialog.value = false
    }

    const { selectedCategory } = useCategoryEntity()

    return {
      openDialog,
      selectedCategory,
      onCloseEvent,
    }
  },
})
</script>
