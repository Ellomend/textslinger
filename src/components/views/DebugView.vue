<template>
  <div class="DebugView">
    <div class="row">
      <div class="col-12">
        <CategoriesDropdown />
      </div>
      <div class="col-12 q-pb-md">
        <TextSearch />
      </div>

      <div class="col-12">
        <TextListContainer />
      </div>
      <div class="col-12 q-pb-md">
        <q-card class="my-card bg-secondary text-white">
          <q-card-section>
            <div class="text-h6">
              Categories
            </div>
          </q-card-section>

          <q-card-section>
            <pre>{{ computedCategories }}</pre>
          </q-card-section>

          <q-separator dark />
          <q-card-section>
            <div class="text-h6">
              Texts
            </div>
          </q-card-section>

          <q-card-section>
            <pre>{{ texts }} </pre>
          </q-card-section>

          <q-separator dark />
        </q-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useCategoryEntity } from 'src/composables/general/useCategoryEntity'
import { useTextEntity } from 'src/composables/general/useTextEntity'
import { defineComponent } from 'vue'
import TextListContainer from '../TextListContainer.vue'
import TextSearch from '../TextSearch.vue'
import CategoriesDropdown from '../CategoriesDropdown.vue'

export default defineComponent({
  name: 'DebugView',
  components: { TextListContainer, TextSearch, CategoriesDropdown },
  setup() {
    const { computedCategories } = useCategoryEntity()
    const { texts } = useTextEntity()

    return {
      computedCategories,
      texts,
    }
  },
})
</script>
