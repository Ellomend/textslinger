<template>
  <div class="NewCategoryButton">
    <!-- button to open dialog -->
    <q-btn size="sm" outline color="primary" @click="openDialog = true" icon="add" />
    <!-- dialog -->
    <q-dialog :no-focus="false" v-model="openDialog">
      <q-card>
        <q-card-section class="q-pt-none">
          <CategoryForm :category="newCategory" @cancel="onClose" :create="true" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { useCategoryEntity } from 'src/composables/general/useCategoryEntity';
import { CategoryEntity } from 'src/services/TextService/BaseTypes';
import { defineComponent, ref } from 'vue';
import CategoryForm from './CategoryForm.vue';

export default defineComponent({
  name: 'NewCategoryButton',
  components: { CategoryForm },
  setup() {
    const openDialog = ref<boolean>(false);

    const onClose = () => openDialog.value = false;

    const { categoryFactory } = useCategoryEntity();

    const newCategory = ref<CategoryEntity>(categoryFactory({
      title: '',
    }));

    return {
      openDialog,
      onClose,
      newCategory,
    };
  },
});
</script>

<style lang="scss">
.ComponentName {
  border: 1px dotted gray;
}
</style>
