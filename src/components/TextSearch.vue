<template>
  <div class="TextSearch">
    <q-input
      autofocus
      debounce="200"
      dense
      outlined
      :model-value="searchString"
      @update:model-value="searchStringUpdated"
    >
      <template #prepend>
        <q-icon name="search" />
      </template>
      <template
        v-if="stringNotEmpty"
        #append
      >
        <q-icon
          name="close"
          class="cursor-pointer"
          @click="searchStringUpdated('')"
        />
      </template>
    </q-input>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useSearch } from 'src/composables/general/useSearch'

export default defineComponent({
  name: 'TextSearch',
  setup() {
    const { searchString, updateSearchString } = useSearch()

    // weird method signature for q-input event, converting to string
    const searchStringUpdated = (newString: string | number | null) => {
      updateSearchString(`${newString}`)
    }

    const stringNotEmpty = computed(() => !!searchString.value.length)

    return { searchString, searchStringUpdated, stringNotEmpty }
  },
})
</script>
