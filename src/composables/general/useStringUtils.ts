import { takeStringBeginning } from 'src/services/TextService/TextUtils';

export function useStringUtils() {
  const textContentStart = (text: string, cut = 25): string => {
    if (text.length > cut) {
      return `${takeStringBeginning(text, cut)}...`;
    }
    return text;
  };

  return {
    textContentStart,
  };
}
