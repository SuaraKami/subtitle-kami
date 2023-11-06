import { useState, useCallback } from 'react'
import { defaults, getAllConfig, saveConfig } from '../config'
import { ActionMeta, SingleValue, Option, LanguageKeys } from '../types'

export function useFormInput() {
  const config = getAllConfig()
  const [hideConfig, setHideConfig] = useState<boolean>(config.hideConfig ?? false)
  const [apiKey, setApiKey] = useState(config.apiKey ?? defaults.apiKey)
  const minPhraseSepTime = 0
  const [phraseSepTime, setPhraseSepTime] = useState<number>(
    config.phraseSepTime ?? defaults.phraseSepTime
  )
  const [recogLang, setRecogLang] = useState<LanguageKeys>(
    config.recogLang ?? (defaults.recogLang as LanguageKeys)
  )
  const [transLang, setTransLang] = useState<LanguageKeys>(
    config.transLang ?? (defaults.transLang as LanguageKeys)
  )
  const [recogFont, setRecogFont] = useState<string>(config.recogFont ?? defaults.recogFont)
  const [customRecogFont, setCustomRecogFont] = useState<string>(
    config.customRecogFont ?? defaults.customRecogFont
  )
  const [useCustomRecogFont, setUseCustomRecogFont] = useState<boolean>(
    config.useCustomRecogFont ?? defaults.useCustomRecogFont
  )
  const [useCustomTransFont, setUseCustomTransFont] = useState<boolean>(
    config.useCustomTransFont ?? defaults.useCustomTransFont
  )
  const [transFont, setTransFont] = useState<string>(config.transFont ?? defaults.transFont)
  const [customTransFont, setCustomTransFont] = useState<string>(
    config.customTransFont ?? defaults.customTransFont
  )
  const [recogFontSize, setRecogFontSize] = useState<number>(
    config.recogFontSize ?? defaults.recogFontSize
  )
  const [recogFontWeight, setRecogFontWeight] = useState<number>(
    config.recogFontWeight ?? defaults.recogFontWeight
  )
  const [recogFontStrokeWidth, setRecogFontStrokeWidth] = useState<number>(
    config.recogFontStrokeWidth ?? defaults.recogFontStrokeWidth
  )
  const [transFontSize, setTransFontSize] = useState<number>(
    config.transFontSize ?? defaults.transFontSize
  )
  const [transFontWeight, setTransFontWeight] = useState<number>(
    config.transFontWeight ?? defaults.transFontWeight
  )
  const [transFontStrokeWidth, setTransFontStrokeWidth] = useState<number>(
    config.transFontStrokeWidth ?? defaults.transFontStrokeWidth
  )
  const [recogFontColor, setRecogFontColor] = useState<string>(
    config.recogFontColor ?? defaults.recogFontColor
  )
  const [transFontColor, setTransFontColor] = useState<string>(
    config.transFontColor ?? defaults.transFontColor
  )
  const [recogFontStrokeColor, setRecogFontStrokeColor] = useState<string>(
    config.recogFontStrokeColor ?? defaults.recogFontStrokeColor
  )
  const [transFontStrokeColor, setTransFontStrokeColor] = useState<string>(
    config.transFontStrokeColor ?? defaults.transFontStrokeColor
  )
  const [bgColor, setBgColor] = useState<string>(config.bgColor ?? defaults.bgColor)
  const [showFontTest, setShowFontTest] = useState<boolean>(
    config.showFontTest ?? defaults.showFontTest
  )
  const [showHistory, setShowHistory] = useState<boolean>(
    config.showHistory ?? defaults.showHistory
  )
  const [recogHeight, setRecogHeight] = useState<number>(config.recogHeight ?? defaults.recogHeight)
  const [transHeight, setTransHeight] = useState<number>(config.transHeight ?? defaults.transHeight)

  const onChangeApiKey = (e: any) => {
    const newApiKey = e?.target?.value ?? ''
    setApiKey(newApiKey)
  }

  const onChangePhraseSepTime = (e: any) => {
    const newValue = e?.target?.value
    let newNum = Number(newValue) || phraseSepTime
    if (newNum < minPhraseSepTime) {
      newNum = minPhraseSepTime
    }
    setPhraseSepTime(newNum)
    saveConfig('phraseSepTime', newNum)
  }

  const onChangeRecogLang = (lang: SingleValue<Option>, meta: ActionMeta<Option>) => {
    const newValue = lang?.value ?? recogLang
    setRecogLang(newValue)
    saveConfig('recogLang', newValue)
  }

  const onChangeTransLang = (lang: SingleValue<Option>, meta: ActionMeta<Option>) => {
    const newValue = lang?.value ?? transLang
    setTransLang(newValue)
    saveConfig('transLang', newValue)
  }

  const onChangeRecogFont = (font: string) => {
    setRecogFont(font)
    saveConfig('recogFont', font)
  }

  const onChangeCustomRecogFont = (font: string) => {
    setCustomRecogFont(font)
    saveConfig('customRecogFont', font)
  }

  const onChangeTransFont = (font: string) => {
    setTransFont(font)
    saveConfig('transFont', font)
  }

  const onChangeCustomTransFont = (font: string) => {
    setCustomTransFont(font)
    saveConfig('customTransFont', font)
  }

  const onToggleCustomRecogFont = (newValue: boolean) => {
    setUseCustomRecogFont(newValue)
    saveConfig('useCustomRecogFont', newValue)
  }

  const onToggleCustomTransFont = (newValue: boolean) => {
    setUseCustomTransFont(newValue)
    saveConfig('useCustomTransFont', newValue)
  }

  const onChangeRecogFontColor = (e: any) => {
    const newValue = e?.target?.value ?? recogFontColor
    setRecogFontColor(newValue)
    saveConfig('recogFontColor', newValue)
  }

  const onChangeTransFontColor = (e: any) => {
    const newValue = e?.target?.value ?? transFontColor
    setTransFontColor(newValue)
    saveConfig('transFontColor', newValue)
  }

  const onChangeRecogFontStrokeColor = (e: any) => {
    const newValue = e?.target?.value ?? recogFontStrokeColor
    setRecogFontStrokeColor(newValue)
    saveConfig('recogFontStrokeColor', newValue)
  }

  const onChangeTransFontStrokeColor = (e: any) => {
    const newValue = e?.target?.value ?? transFontStrokeColor
    setTransFontStrokeColor(newValue)
    saveConfig('transFontStrokeColor', newValue)
  }

  const onChangeBgColor = (e: any) => {
    const newValue = e?.target?.value ?? bgColor
    setBgColor(newValue)
    saveConfig('bgColor', newValue)
  }

  const onChangeRecogFontSize = (e: any) => {
    const newValue = e?.target?.value
    const newNum = Number(newValue) || recogFontSize
    setRecogFontSize(newNum)
    saveConfig('recogFontSize', newNum)
  }

  const onChangeRecogFontWeight = (e: any) => {
    const newValue = e?.target?.value
    const newNum = Number(newValue) || recogFontWeight
    setRecogFontWeight(newNum)
    saveConfig('recogFontWeight', newNum)
  }

  const onChangeRecogFontStrokeWidth = (e: any) => {
    const newValue = e?.target?.value
    const newNum = Number(newValue) || recogFontStrokeWidth
    setRecogFontStrokeWidth(newNum)
    saveConfig('recogFontStrokeWidth', newNum)
  }

  const onChangeTransFontSize = (e: any) => {
    const newValue = e?.target?.value
    const newNum = Number(newValue) || transFontSize
    setTransFontSize(newNum)
    saveConfig('transFontSize', newNum)
  }

  const onChangeTransFontWeight = (e: any) => {
    const newValue = e?.target?.value
    const newNum = Number(newValue) || transFontWeight
    setTransFontWeight(newNum)
    saveConfig('transFontWeight', newNum)
  }

  const onChangeTransFontStrokeWidth = (e: any) => {
    const newValue = e?.target?.value
    const newNum = Number(newValue) || transFontStrokeWidth
    setTransFontStrokeWidth(newNum)
    saveConfig('transFontStrokeWidth', newNum)
  }

  const onChangeShowFontTest = () => {
    const newValue = !showFontTest
    setShowFontTest(newValue)
    saveConfig('showFontTest', newValue)
  }

  const onChangeShowHistory = () => {
    const newValue = !showHistory
    setShowHistory(newValue)
    saveConfig('showHistory', newValue)
  }

  const onToggleHideConfig = () => {
    const newValue = !hideConfig
    setHideConfig(newValue)
    saveConfig('hideConfig', newValue)
  }

  const onChangeRecogHeight = (e: any) => {
    const newValue = e?.target?.value
    const newNum = Number(newValue) || recogHeight
    setRecogHeight(newNum)
    saveConfig('recogHeight', newNum)
  }

  const onChangeTransHeight = (e: any) => {
    const newValue = e?.target?.value
    const newNum = Number(newValue) || transHeight
    setTransHeight(newNum)
    saveConfig('transHeight', newNum)
  }

  const handleSwitch = useCallback(() => {
    const newRecogLang = transLang
    setRecogLang(newRecogLang)
    saveConfig('recogLang', newRecogLang)

    const newTransLang = recogLang // actually safe, because state is not updated directly
    setTransLang(newTransLang)
    saveConfig('transLang', newTransLang)

    return {
      recogLang: newRecogLang,
      transLang: newTransLang,
    }
  }, [recogLang, transLang, setRecogLang, setTransLang])

  return {
    value: {
      hideConfig,
      apiKey,
      phraseSepTime,
      recogLang,
      transLang,
      recogFont,
      transFont,
      bgColor,
      customRecogFont,
      customTransFont,
      recogFontColor,
      transFontColor,
      recogFontStrokeColor,
      transFontStrokeColor,
      recogFontSize,
      transFontSize,
      recogFontWeight,
      transFontWeight,
      recogFontStrokeWidth,
      transFontStrokeWidth,
      showFontTest,
      showHistory,
      recogHeight,
      transHeight,
      useCustomRecogFont,
      useCustomTransFont,
    },
    handler: {
      handleSwitch,
      onChangeApiKey,
      onChangeBgColor,
      onChangeCustomRecogFont,
      onChangeCustomTransFont,
      onChangePhraseSepTime,
      onChangeRecogFont,
      onChangeRecogFontColor,
      onChangeRecogFontStrokeColor,
      onChangeRecogFontStrokeWidth,
      onChangeRecogFontSize,
      onChangeRecogFontWeight,
      onChangeRecogHeight,
      onChangeRecogLang,
      onChangeShowFontTest,
      onChangeShowHistory,
      onChangeTransFont,
      onChangeTransFontColor,
      onChangeTransFontStrokeColor,
      onChangeTransFontStrokeWidth,
      onChangeTransFontSize,
      onChangeTransFontWeight,
      onChangeTransHeight,
      onChangeTransLang,
      onToggleCustomRecogFont,
      onToggleCustomTransFont,
      onToggleHideConfig,
    },
  }
}
