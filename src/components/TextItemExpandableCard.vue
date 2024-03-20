<template>
  <div class="TextItemExpandableCard q-mb-md">
    <q-card
      bordered
      flat
    >
      <div class="row">
        <div class="col-1  flex flex items-center justify-center">
          <div class="row ">
            <div class="col-12 flex items-center justify-center ">
              <q-btn
                outline
                color="green"
                icon="content_copy"
                size="xs"
                class="q-ma-xs"
                @click="copyText(text.content)"
              />
            </div>
            <div
              v-if="isLong"
              class="col-12 flex items-center justify-center "
            >
              <q-btn
                v-if="isLong"
                class="q-ma-xs"
                color="blue"
                outline
                size="xs"
                :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
                @click="expanded = !expanded"
              />
            </div>
          </div>
        </div>
        <div
          class="col-10 q-px-md flex items-center"
        >
          <div>
            <div
              class="text-overline text-orange-9 q-my-xs"
            >
              {{ text?.title }}
            </div>
            <div
              class="text-caption text-grey q-my-xs"
            >
              {{ textDisplay(text.content) }}
            </div>
          </div>
        </div>
        <div
          class="col-1 flex items-center justify-center"
        >
          <div>
            <TextItemEditButton
              :text="text"
            />
          </div>
        </div>
      </div>
      <q-slide-transition>
        <div v-show="expanded">
          <q-separator />
          <q-card-section class="text-caption text-grey">
            <p>{{ text.content }}</p>
          </q-card-section>
        </div>
      </q-slide-transition>
    </q-card>
  </div>
</template>

<script lang="ts">
import { TextEntity } from 'src/services/TextService/BaseTypes'
import { computed, defineComponent, ref } from 'vue'
import { useStringUtils } from 'src/composables/general/useStringUtils'
import { useTextEntity } from 'src/composables/general/useTextEntity'
import { useQuasar } from 'quasar'
import TextItemEditButton from './TextItemEditButton.vue'

export default defineComponent({
  name: 'TextItemExpandableCard',
  components: { TextItemEditButton },
  props: {
    text: {
      type: Object as () => TextEntity,
      required: true,
    },
  },
  setup(props) {
    const cutoff = 150

    const expanded = ref<boolean>(false)

    const isLong = computed(() => props.text.content.length > cutoff)

    // copy to clipboard
    const { textToClipBoard } = useTextEntity(null)
    const $q = useQuasar()

    const copyText = (text: string) => {
      textToClipBoard(text)

      $q.notify({
        message: 'Copied to clipboard!',
        type: 'positive',
        icon: 'check',
        color: 'green',
        position: 'top',
        timeout: 1000,
        group: false,
      })
    }

    // text display
    const { textContentStart } = useStringUtils()

    // TODO: do we really want this abstraction ???
    // we probably should just do str logic here
    // maybe later
    const textDisplay = (content: string) => textContentStart(content, 150)

    return {
      expanded, copyText, textDisplay, isLong,
    }
  },
})
</script>
