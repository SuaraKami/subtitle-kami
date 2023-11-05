import ReactSelect, { ActionMeta, SingleValue } from 'react-select'
import type { LanguageLabels, LanguageKeys } from '../lib/types'

export type LanguageType = 'transcribe' | 'translate'

export interface LanguageSelectProps {
  value?: LanguageKeys // Allows passing short language code instead of full react-select OptionType
  label?: string
  languageType?: LanguageType
  id?: string
  onChange?: (newValue: SingleValue<Option>, meta: ActionMeta<Option>) => void
}

// Supported translate languages
// ref: https://cloud.google.com/translate/docs/languages
//
// Transcription languages
// ref: https://stackoverflow.com/questions/14257598
export const translateLanguages: LanguageLabels = {
  en: {
    english: 'English',
    native: 'English',
  },
  de: {
    english: 'German',
    native: 'Deutsch',
  },
  id: {
    english: 'Indonesian',
    native: 'Bahasa Indonesia',
  },
}

// For simplicity, for now set languages to be the same subset for transcription/translation
const transcribeLanguages = translateLanguages

export type Option = {
  value: LanguageKeys
  label: string
}
export type { ActionMeta, SingleValue } from 'react-select'

// Extending react-select
// ref: https://stackoverflow.com/questions/66348283/
/*
export function LanguageSelect<
  OptionType,
  IsMulti extends boolean = false,
  GroupType extends GroupBase<OptionType> = GroupBase<OptionType>
>({
  languageType = 'translate',
  defaultVal = 'en',
  id,
  ...props
}: Props<OptionType, IsMulti, GroupType> & LanguageSelectProps) {
*/

// ref: https://stackoverflow.com/a/74143834
export function LanguageSelect({
  languageType = 'translate',
  value = 'en',
  label = 'English',
  onChange,
  id,
  ...props
}: LanguageSelectProps) {
  const languages = languageType === 'translate' ? translateLanguages : transcribeLanguages

  const languageOptions: Option[] = Object.entries(languages).map(([key, value]) => {
    return {
      value: (key as LanguageKeys) ?? '',
      label: value.english ?? '',
    }
  })

  const option: Option = {
    value: value ?? '',
    label: label ?? '',
  }

  return (
    <ReactSelect
      inputId={id}
      options={languageOptions}
      getOptionLabel={(opt: Option) => opt.label}
      getOptionValue={(opt: Option) => opt.value}
      value={option}
      onChange={onChange}
      isSearchable
      components={{
        // Hide dropdown indicator to match fontpicker
        IndicatorSeparator: () => null,
        DropdownIndicator: () => null,
      }}
      className="w-64"
      //styles={{
      //  control: base => ({
      //    ...base,
      //    '&:active': {
      //      border: '1px solid #000',
      //    },
      //    '&:focus': {
      //      border: '1px solid #000',
      //    }
      //  })
      //}}
      {...props}
    />
  )
}
