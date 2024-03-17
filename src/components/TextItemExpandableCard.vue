<template>
  <div class="TextItemExpandableCard q-mb-sm">
    <q-card
      flat
      bordered
    >
      <div class="row">
        <div class="col-12 q-px-md">
          <div class="text-overline text-orange-9">
            {{ text?.title }}
          </div>
          <div
            v-if="!isLong"
            class="text-caption text-grey"
          >
            {{ text.content }}
          </div>
        </div>
        <div class="col-6 flex items-center justify-start q-pb-sm">
          <div>
            <q-btn
              outline
              color="green"
              icon="content_copy"
              size="xs"
              class="q-ml-sm"
              @click="copyText(text.content)"
            />
          </div>
        </div>
        <div class="col-6 flex items-center justify-end q-pb-sm">
          <TextItemEditButton
            :text="text"
            class="q-mr-md"
          />
          <div>
            <q-btn
              v-if="isLong"
              class="q-mr-sm"
              color="blue"
              outline
              size="xs"
              :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
              @click="expanded = !expanded"
            />
          </div>
        </div>
      </div>
      <q-slide-transition>
        <div v-show="expanded">
          <q-separator />
          <q-card-section class="text-subtitle2">
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

    const copyText = (text: string) => {
      textToClipBoard(text)
    }

    // text display
    const { textContentStart } = useStringUtils()

    // TODO: do we really want this abstraction ???
    // we probably should just do str logic here
    // maybe later
    const textDisplay = (content: string) => textContentStart(content, 200)

    return {
      expanded, copyText, textDisplay, isLong,
    }
  },
})
</script>
