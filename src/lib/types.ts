export type LanguageKeys = 'en' | 'de' | 'id'

export type LanguageLabels = {
  [key in LanguageKeys]: {
    english: string
    native: string
  }
}

export type Option = {
  value: LanguageKeys
  label: string
}
export type { ActionMeta, SingleValue } from 'react-select'
