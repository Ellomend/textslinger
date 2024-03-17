import { computed, ref } from 'vue';
import { TextService } from 'src/services/TextService/TextService';
import { useTextsStore } from 'src/stores/texts-store';
import { useOptionsStore } from 'src/stores/options-store';
import { copyToClipboard } from '../../services/TextService/TextUtils';
import { TextEntity } from '../../services/TextService/BaseTypes';

export function useTextEntity(textProp: TextEntity | null | undefined = null) {
  const textsStore = useTextsStore();
  const optionsStore = useOptionsStore();

  const { textFactory } = TextService;
  const wrapWithSpaces = computed(() => optionsStore.wrapWithSpaces);

  const editingTextFactory = (text: TextEntity | null | undefined): TextEntity => textFactory(text || {});

  const editingText = ref<TextEntity>(editingTextFactory(textProp));

  const updateTextInStore = (text: TextEntity): void => {
    textsStore.updateText(text);
  };

  const removeTextFromStore = (text: TextEntity): void => {
    textsStore.removeText(text.id);
  };

  const addTextToStore = (text: TextEntity): void => {
    textsStore.createText(text);
  };

  const textToClipBoard = (textString: string) => {
    const string = wrapWithSpaces.value ? ` ${textString} ` : textString;
    copyToClipboard(string);
  };

  return {
    editingText,
    updateTextInStore,
    removeTextFromStore,
    addTextToStore,
    textFactory,
    textToClipBoard,
  };
}
