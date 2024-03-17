<template>
  <div class="NewCategoryButton">
    <!-- button to open dialog -->
    <q-btn
      size="sm"
      outline
      color="primary"
      icon="add"
      @click="openDialog = true"
    />
    <!-- dialog -->
    <q-dialog
      v-model="openDialog"
      :no-focus="false"
    >
      <q-card>
        <q-card-section class="q-pt-none">
          <CategoryForm
            :category="newCategory"
            :create="true"
            @cancel="onClose"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { useCategoryEntity } from 'src/composables/general/useCategoryEntity'
import { CategoryEntity } from 'src/services/TextService/BaseTypes'
import { defineComponent, ref } from 'vue'
import CategoryForm from './CategoryForm.vue'

export default defineComponent({
  name: 'NewCategoryButton',
  components: { CategoryForm },
  setup() {
    const openDialog = ref<boolean>(false)

    const onClose = () => { openDialog.value = false }

    const { categoryFactory } = useCategoryEntity()

    const newCategory = ref<CategoryEntity>(categoryFactory({
      title: '',
    }))

    return {
      openDialog,
      onClose,
      newCategory,
    }
  },
})
</script>

<style lang="scss">
.ComponentName {
  border: 1px dotted gray;
}
</style>
