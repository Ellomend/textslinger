
export function useValidation() {
  const minLength = 2
  const maxTitleLength = 100

  const validationMessages = {
    minLength: `Minimum length is ${minLength} characters.`,
    maxLength: `Maximum length is ${maxTitleLength} characters.`,
  };

  const validateTitle = (value: string): true | string => {
    if (value.length < minLength) {
      return validationMessages['minLength']
    } else if (value.length > maxTitleLength) {
      return validationMessages['maxLength']
    }
    return true
  }

  const validateContent = (value: string): true | string => {
    if (value.length < minLength) {
      return validationMessages['minLength']
    } else {
      return true
    }
  }

  return {
    validateTitle,
    validateContent,
    validationMessages
  }
}