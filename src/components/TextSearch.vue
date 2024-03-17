<template>
  <div class="TextSearch">
    <q-input autofocus debounce="200" dense outlined :modelValue="searchString"
      @update:model-value="searchStringUpdated">
      <template v-slot:prepend>
        <q-icon name="search" />
      </template>
      <template v-slot:append v-if="stringNotEmpty">
        <q-icon name="close" @click="searchStringUpdated('')" class="cursor-pointer" />
      </template>
    </q-input>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useSearch } from 'src/composables/general/useSearch';

export default defineComponent({
  name: 'TextSearch',
  setup() {

    const { searchString, updateSearchString } = useSearch()

    // weird method signature for q-input event, converting to string
    const searchStringUpdated = (newString: string | number | null) => {
      updateSearchString(`${newString}`)
    }

    const stringNotEmpty = computed(() => {
      return !!searchString.value.length
    });


    return { searchString, searchStringUpdated, stringNotEmpty }
  },
});
</script>
