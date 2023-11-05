import { useState, useEffect, useCallback } from 'react'
import SpeechRecognition, { useSubtitles } from '../lib/useSubtitles'
import { Subtitle } from './Subtitle'
import { IconToggle } from './IconToggle'
import { MicIcon } from './icons/MicIcon'
import { MaximizeIcon } from './icons/MaximizeIcon'
import { SettingsIcon } from './icons/SettingsIcon'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { LanguageKeys } from '../lib/types'

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
}: Readonly<SubtitlerProps>) {
  const [enabled, setEnabled] = useState(false)
  const handle = useFullScreenHandle()

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
    showHistory,
  })

  const handleStart = useCallback(async () => {
    setEnabled(true)
    await SpeechRecognition.startListening({
      language: recogLang,
      continuous: true,
    })
  }, [recogLang])

  const handleStop = useCallback(async () => {
    setEnabled(false)
    await SpeechRecognition.abortListening()
  }, [])

  const handleReset = useCallback(() => {
    reset()
  }, [reset])

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Enter' || event.code === 'Enter') {
        handleReset()
      }

      if (event.key === 'r' || event.code === 'keyR') {
        handleStop().then(() => handleStart())
      }
    },
    [handleReset, handleStop, handleStart]
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
      <FullScreen handle={handle}>
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
            lang={recogLang}
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
          value={translation1}
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
              <button
                onClick={handleStart}
                className="w-32 py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 active:bg-green-700 disabled:opacity-50"
              >
                Start
              </button>
            )}
            {enabled && (
              <button
                onClick={handleStop}
                className="w-32 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 active:bg-red-700 disabled:opacity-50"
              >
                Stop
              </button>
            )}
            <button
              onClick={handleReset}
              className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
            >
              Reset
            </button>
            <button
              onClick={handle.enter}
              className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
            >
              <MaximizeIcon />
            </button>
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
