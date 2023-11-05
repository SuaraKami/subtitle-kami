export type LanguageKeys = 'en' | 'de' | 'id'

export type LanguageLabels = {
  [key in LanguageKeys]: {
    english: string
    native: string
  }
}
