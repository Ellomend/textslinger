<template>
  <div class="row">
    <div class="col-12 flex justify-start">
      <div>
        <q-btn-dropdown outline size="sm" color="primary" :label="buttonTitle">
          <q-list dense>
            <q-item clickable v-close-popup v-for="category in computedCategories" :key="category.id"
              @click="onCategoryClicked(category)">
              <q-item-section>
                <q-item-label>{{ category.title }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="check" color="green" v-if="category.id === selectedCategoryId" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
      <div class="q-mx-sm">
        <CategoryEdit />
      </div>
      <div>
        <NewCategoryButton />
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useCategoryEntity } from 'src/composables/general/useCategoryEntity';
import { CategoryEntity } from 'src/services/TextService/BaseTypes';
import CategoryEdit from './CategoryEdit.vue';
import NewCategoryButton from './NewCategoryButton.vue';

export default defineComponent({
  name: 'CategoriesDropdown',
  components: { CategoryEdit, NewCategoryButton },
  setup() {
    const {
      selectCategory,
      selectedCategoryId,
      selectedCategory,
      computedCategories,
    } = useCategoryEntity();

    const onCategoryClicked = (category: CategoryEntity) => {
      selectCategory(category.id);
    };

    const buttonTitle = computed(() => selectedCategory.value?.title || 'Select category');

    return {
      computedCategories,
      onCategoryClicked,
      selectedCategoryId,
      buttonTitle,
    };
  },
});
</script>
