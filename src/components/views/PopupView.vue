<template>
  <div class="PopupView">
    <div class="row">
      <div class="col-12 q-pb-md">
        <CategoriesDropdown />
      </div>
      <div class="col-12 q-pb-md">
        <TextSearch />
      </div>

      <div class="col-12">
        <TextListContainer />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CategoriesDropdown from '../CategoriesDropdown.vue';
import TextListContainer from '../TextListContainer.vue';
import TextSearch from '../TextSearch.vue';

export default defineComponent({
  name: 'PopupView',
  components: {
    TextSearch,
    CategoriesDropdown,
    TextListContainer,
  },
});
</script>
