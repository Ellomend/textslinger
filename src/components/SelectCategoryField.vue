<template>
  <div class="SelectCategoryField">
    <div class="row">
      <div class="col-12">
        <q-btn
          v-for="category in computedCategories"
          :key="category.id"
          class="q-mr-sm"
          rounded
          size="sm"
          :label="category.title"
          :color="categoryButtonColor(category)"
          @click="onCategoryClicked(category)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { useCategoryEntity } from 'src/composables/general/useCategoryEntity'
import { CategoryEntity, TextEntity } from 'src/services/TextService/BaseTypes'

export default defineComponent({
  name: 'SelectCategoryField',
  props: {
    text: {
      type: Object as () => TextEntity,
      required: true,
    },
  },
  emits: ['category-select'],
  setup(props, { emit }) {
    const { computedCategories } = useCategoryEntity()

    const onCategoryClicked = (category: CategoryEntity) => {
      emit('category-select', category)
    }

    const categoryButtonColor = (category: CategoryEntity): string => (category.id === props.text?.category ? 'green' : 'blue')

    return { computedCategories, onCategoryClicked, categoryButtonColor }
  },
})
</script>
