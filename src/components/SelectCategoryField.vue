<template>
  <div class="SelectCategoryField">
    <div class="row">
      <div class="col-12">
        <q-btn class="q-mr-sm" v-for="category in computedCategories" :key="category.id" rounded size="sm"
          @click="onCategoryClicked(category)" :label="category.title" :color="categoryButtonColor(category)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useCategoryEntity } from 'src/composables/general/useCategoryEntity';
import { CategoryEntity, TextEntity } from 'src/services/TextService/BaseTypes';

export default defineComponent({
  name: 'SelectCategoryField',
  props: {
    text: Object as () => TextEntity
  },
  emits: ['category-select'],
  setup(props, { emit }) {

    const { computedCategories } = useCategoryEntity()

    const onCategoryClicked = (category: CategoryEntity) => {
      emit('category-select', category)
    }

    const categoryButtonColor = (category: CategoryEntity): string => {
      return category.id === props.text?.category ? 'green' : 'blue'
    }

    return { computedCategories, onCategoryClicked, categoryButtonColor };
  },
});
</script>
