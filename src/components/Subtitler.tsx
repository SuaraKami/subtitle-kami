import { useState, useEffect, useCallback } from 'react'
import SpeechRecognition, { useSubtitles } from '../lib/hooks/useSubtitles'
import { Subtitle } from './Subtitle'
import { IconToggle } from './IconToggle'
import { MicIcon } from './icons/MicIcon'
import { MaximizeIcon } from './icons/MaximizeIcon'
import { NextIcon } from './icons/NextIcon'
import { PreviousIcon } from './icons/PreviousIcon'
import { SettingsIcon } from './icons/SettingsIcon'
import { SwitchIcon } from './icons/SwitchIcon'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { LanguageKeys } from '../lib/types'
import { ShortcutTooltip } from './ShortcutTooltip'

export interface SubtitlerProps {
  apiKey?: string
  phraseSepTime: number
  recogLang: LanguageKeys
  transLang: LanguageKeys
  recogFont: string
  transFont: string
  bgColor: string
  recogFontColor: string
  transFontColor: string
  recogFontStrokeColor: string
  transFontStrokeColor: string
  recogFontSize: number
  recogFontWeight: number
  recogFontStrokeWidth: number
  transFontSize: number
  transFontWeight: number
  transFontStrokeWidth: number
  showFontTest?: boolean
  showHistory?: boolean
  hideConfig?: boolean
  onToggleHideConfig?: () => void
  recogHeight?: number
  transHeight?: number
  averageReadSpeed?: number
  minDisplayTime?: number
  maxDisplayTime?: number
  handleSwitch: () => {
    recogLang: LanguageKeys
    transLang: LanguageKeys
  }
}

export function Subtitler({
  apiKey,
  phraseSepTime,
  recogLang,
  transLang,
  recogFont,
  transFont,
  bgColor,
  recogFontColor,
  transFontColor,
  recogFontStrokeColor,
  transFontStrokeColor,
  recogFontSize,
  recogFontWeight,
  recogFontStrokeWidth,
  transFontSize,
  transFontWeight,
  transFontStrokeWidth,
  showFontTest,
  showHistory,
  hideConfig = false,
  onToggleHideConfig,
  recogHeight,
  transHeight,
  averageReadSpeed = 200,
  minDisplayTime = 2000,
  maxDisplayTime = 5000,
  handleSwitch,
}: Readonly<SubtitlerProps>) {
  const [enabled, setEnabled] = useState(false)

  const {
    transcript,
    listening,
    reset,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
    translation1,
  } = useSubtitles({
    recogLang,
    transLang,
    apiKey,
    phraseSepTime,
    enabled,
    showHistory: true,
  })

  const translations = translation1.split('\n')

  const [translateFrom, setTranslateFrom] = useState(showHistory ? 0 : translations.length - 1)
  const [translateTo, setTranslateTo] = useState(translations.length - 1)

  useEffect(() => {
    setTranslateFrom(showHistory ? 0 : translations.length - 1)
    setTranslateTo(translations.length - 1)
  }, [translations.length, showHistory])

  const dynamicTranslate = translations.slice(translateFrom, translateTo + 1).join('\n')

  const handleStart = useCallback(() => {
    setEnabled(true)
    SpeechRecognition.startListening({
      language: recogLang,
      continuous: true,
    })
  }, [recogLang])

  const handleStop = useCallback(() => {
    SpeechRecognition.abortListening()
    setEnabled(false)
  }, [])

  const handleReset = useCallback(() => {
    reset()
  }, [reset])

  const handleRestart = useCallback(
    async (recogLang: LanguageKeys) => {
      if (enabled) {
        handleReset()
        await SpeechRecognition.abortListening()
        await SpeechRecognition.startListening({
          language: recogLang,
          continuous: true,
        })
      }
    },
    [enabled, handleReset]
  )

  const handleNext = useCallback(() => {
    if (showHistory) return
    setTranslateFrom((prev) => Math.min(prev + 1, translations.length - 1))
  }, [translations.length, showHistory])

  const handlePrev = useCallback(() => {
    if (showHistory) return
    setTranslateFrom((prev) => Math.max(prev - 1, 0))
  }, [showHistory])

  const fullScreenHandler = useFullScreenHandle()
  const handleFullScreen = useCallback(() => {
    if (fullScreenHandler.active) {
      fullScreenHandler.exit()
    } else {
      fullScreenHandler.enter()
    }
  }, [fullScreenHandler])

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Enter' || event.code === 'Enter') {
        enabled ? handleStop() : handleStart()
      } else if (event.key === 'r' || event.code === 'KeyR') {
        handleReset()
      } else if (event.key === 'n' || event.code === 'KeyN') {
        handleNext()
      } else if (event.key === 'p' || event.code === 'KeyP') {
        handlePrev()
      } else if (event.key === 'f' || event.code === 'KeyF') {
        handleFullScreen()
      } else if (event.key === 's' || event.code === 'KeyS') {
        const { recogLang } = handleSwitch()
        handleRestart(recogLang)
      }
    },
    [
      enabled,
      handleStart,
      handleStop,
      handleRestart,
      handleNext,
      handlePrev,
      handleReset,
      handleSwitch,
      handleFullScreen,
    ]
  )

  useEffect(() => {
    // attach the event listener
    document.addEventListener('keydown', handleKeyPress)

    // remove the event listener
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress])

  let error
  if (!browserSupportsSpeechRecognition) {
    error = "Your browser doesn't support speech recognition :("
  } else if (!isMicrophoneAvailable) {
    error = 'Please allow this page to access your microphone'
  } else if (!navigator.onLine) {
    error = 'Device offline! Speech recognition requires an internet connection'
  }

  if (error) {
    return <p>{error}</p>
  }

  const testText = `Qui accusamus iure qui tempora laboriosam ut ut. Ut voluptatem ut repudiandae. Ipsam distinctio aut sed architecto est velit fugit velit. Soluta nesciunt consequatur labore.
  // ... (rest of your test text)
  `

  return (
    <>
      <FullScreen handle={fullScreenHandler}>
        {showFontTest && (
          <Subtitle
            fontFamily={recogFont}
            value={testText}
            bottomBorder
            inputId="testSubtitles"
            bgColor={bgColor}
            fontColor={recogFontColor}
            fontStrokeColor={recogFontStrokeColor}
            fontSize={recogFontSize}
            fontWeight={recogFontWeight}
            fontStrokeWidth={recogFontStrokeWidth}
            scrollBottom={false}
            height={recogHeight}
          />
        )}
        <Subtitle
          fontFamily={recogFont}
          value={transcript}
          inputId="recogSubtitles"
          bgColor={bgColor}
          fontColor={recogFontColor}
          fontStrokeColor={recogFontStrokeColor}
          fontSize={recogFontSize}
          fontWeight={recogFontWeight}
          fontStrokeWidth={recogFontStrokeWidth}
          height={recogHeight}
          lang={recogLang}
        />
        <Subtitle
          fontFamily={transFont}
          value={dynamicTranslate}
          inputId="transSubtitles"
          bgColor={bgColor}
          fontColor={transFontColor}
          fontStrokeColor={transFontStrokeColor}
          fontSize={transFontSize}
          fontWeight={transFontWeight}
          fontStrokeWidth={transFontStrokeWidth}
          scrollBottom={showHistory}
          height={transHeight}
          lang={transLang}
        />
      </FullScreen>
      <div className="p-8 border border-gray-200">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <span className="py-2 px-4">
              <MicIcon stroke={listening ? 'red' : 'black'} fill={listening ? 'red' : 'none'} />
            </span>
            {!enabled && (
              <ShortcutTooltip shortcut="↵">
                <button
                  onClick={handleStart}
                  className="w-32 py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 active:bg-green-700 disabled:opacity-50"
                >
                  Start
                </button>
              </ShortcutTooltip>
            )}
            {enabled && (
              <ShortcutTooltip shortcut="↵">
                <button
                  onClick={handleStop}
                  className="w-32 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 active:bg-red-700 disabled:opacity-50"
                >
                  Stop
                </button>
              </ShortcutTooltip>
            )}

            <ShortcutTooltip shortcut="R">
              <button
                onClick={handleReset}
                className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
              >
                Reset
              </button>
            </ShortcutTooltip>

            <ShortcutTooltip shortcut="P">
              <button
                onClick={handlePrev}
                className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
                disabled={showHistory}
              >
                <PreviousIcon />
              </button>
            </ShortcutTooltip>

            <ShortcutTooltip shortcut="N">
              <button
                onClick={handleNext}
                className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
                disabled={showHistory}
              >
                <NextIcon />
              </button>
            </ShortcutTooltip>

            <ShortcutTooltip shortcut="S">
              <button
                className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
                disabled
              >
                <SwitchIcon />
              </button>
            </ShortcutTooltip>

            <ShortcutTooltip shortcut="F">
              <button
                onClick={handleFullScreen}
                className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
              >
                <MaximizeIcon />
              </button>
            </ShortcutTooltip>
          </div>
          <div className="space-x-4 ml-auto">
            <IconToggle
              id="settingsToggle"
              icon={<SettingsIcon fill={'white'} />}
              label="Settings"
              checked={!hideConfig}
              onChange={onToggleHideConfig}
            />
          </div>
        </div>
      </div>
    </>
  )
}
