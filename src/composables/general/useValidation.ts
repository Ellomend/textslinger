import { MAX_TITLE_LENGTH, MIN_CONTENT_LENGTH, MIN_TITLE_LENGTH } from 'src/constants'
import Joi from 'joi'
import { CategoryEntity, TextEntity } from 'src/services/TextService/BaseTypes'

export function useValidation() {
  const minTitleLength = MIN_TITLE_LENGTH
  const maxTitleLength = MAX_TITLE_LENGTH
  const minContentLength = MIN_CONTENT_LENGTH

  const validationMessages = {
    minLength: `Minimum length is ${minTitleLength} characters.`,
    maxLength: `Maximum length is ${maxTitleLength} characters.`,
  }

  const validateTitle = (value: string): true | string => {
    if (value.length < minTitleLength) {
      return validationMessages.minLength
    } if (value.length > maxTitleLength) {
      return validationMessages.maxLength
    }
    return true
  }

  const validateContent = (value: string): true | string => {
    if (value.length < minContentLength) {
      return validationMessages.minLength
    }
    return true
  }

  // entities validation
  // texts
  const textEntitySchema = Joi.object<TextEntity>({
    id: Joi.string().required(),
    title: Joi.string().min(minTitleLength).max(maxTitleLength).required(),
    content: Joi.string().min(minContentLength).required(),
    category: Joi.string().allow(null).optional(),
  })

  const validateTextEntity = (text: TextEntity): Joi.ValidationResult<TextEntity> => (
    textEntitySchema.validate(text)
  )

  const validateTextsArray = (arrayOfTexts: TextEntity[]): Joi.ValidationResult<TextEntity> => (
    Joi.array<TextEntity>().items(textEntitySchema).validate(arrayOfTexts)
  )

  // categories
  const categoryEntitySchema = Joi.object<CategoryEntity>({
    id: Joi.string().min(minTitleLength).max(maxTitleLength).required(),
    title: Joi.string().required(),
  })

  // eslint-disable-next-line max-len
  const validateCategoryEntity = (category: CategoryEntity): Joi.ValidationResult<CategoryEntity> => (
    categoryEntitySchema.validate(category)
  )

  // TODO: fix eslint
  // eslint-disable-next-line max-len
  const validateCategoriesArray = (arrayOfCategories: CategoryEntity[]): Joi.ValidationResult<CategoryEntity> => (
    Joi.array<CategoryEntity>().items(categoryEntitySchema).validate(arrayOfCategories)
  )

  return {
    validateTitle,
    validateContent,
    validationMessages,
    validateTextEntity,
    validateTextsArray,
    validateCategoryEntity,
    validateCategoriesArray,
  }
}
