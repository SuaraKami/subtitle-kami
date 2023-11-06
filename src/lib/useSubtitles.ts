import { useEffect, useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import axios, { AxiosResponse } from 'axios'
import logger from './logger'
import { appendToFixedSizeString } from './history'
import { E_ALREADY_LOCKED, Mutex, tryAcquire } from 'async-mutex'

export default SpeechRecognition

export interface Props {
  recogLang?: string
  transLang?: string
  interimResults?: boolean
  apiKey?: string
  enabled?: boolean
  phraseSepTime?: number
  minPhraseLength?: number
  maxPhraseLength?: number
  maxDelay?: number
  usePost?: boolean
  showHistory?: boolean
}

export function useSubtitles(props: Props = {}) {
  const [translation, setTranslation] = useState('')

  const maxLogSize = 5000 // Fairly arbitrary, rendering plaintext is cheap
  const [transcriptLog, setTranscriptLog] = useState('')
  const [translationLog, setTranslationLog] = useState('')

  const {
    recogLang = 'id',
    transLang = 'de',
    interimResults = true,
    apiKey,
    phraseSepTime = 10, // ms
    minPhraseLength = 20,
    maxPhraseLength = 1000, // <2000
    maxDelay = 500, // ms, must be less than about a minute
    usePost = false,
    showHistory = false,
  } = props

  const transUrl = 'https://script.google.com/macros/s/' + apiKey + '/exec'

  const {
    finalTranscript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition()

  const mutex = new Mutex()

  const dynamicPhraseSepTime = phraseSepTime

  const reset = async () => {
    resetTranscript()
    setTranslation('')
    setTranscriptLog('')
    setTranslationLog('')
  }

  const requestTranslationQuery = async (dynamicPhraseSepTime: number) => {
    try {
      await tryAcquire(mutex).runExclusive(async () => {
        const text = finalTranscript?.trim()
        setTranscriptLog((prev) => {
          const separator = prev.length > 0 ? '\n' : ''
          return appendToFixedSizeString(prev, separator + text, maxLogSize)
        })
        resetTranscript()
        if (apiKey) {
          await doQuery(text, usePost, dynamicPhraseSepTime)
        }
      })
    } catch (e) {
      if (e !== E_ALREADY_LOCKED) {
        logger.error('Error querying translation: ' + e)
      }
    }
  }

  const handleTranscriptChange = () => {
    if (finalTranscript) {
      const dynamicPhraseSepTime = Math.max(
        minPhraseLength,
        Math.min(maxPhraseLength, finalTranscript.length * (phraseSepTime / minPhraseLength))
      )
      requestTranslationQuery(dynamicPhraseSepTime)
    }
  }

  useEffect(() => {
    if (interimResults) {
      handleTranscriptChange()
    }
  }, [finalTranscript, maxPhraseLength, minPhraseLength, dynamicPhraseSepTime])

  const doQuery = async (text: string, usePost = false, dynamicPhraseSepTime: any) => {
    let query
    if (usePost) {
      query = `${transUrl}?source=${recogLang}&target=${transLang}`
    } else {
      query = `${transUrl}?text=${text}&source=${recogLang}&target=${transLang}`
    }
    try {
      const requestConfig = {
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
      }
      let resp
      if (usePost) {
        resp = await axios.post(query, text, requestConfig)
      } else {
        resp = await axios.get(query, requestConfig)
      }
      const trans = resp?.data ?? ''
      if (trans) {
        setTranslation(trans)
        setTranslationLog((prev) => {
          const separator = prev.length > 0 ? '\n' : ''
          return appendToFixedSizeString(prev, separator + trans, maxLogSize)
        })
      }
    } catch (e) {
      logger.error(e)
    }
  }

  let returnedTranscript
  if (showHistory) {
    returnedTranscript = transcriptLog
  } else if (interimResults) {
    returnedTranscript = finalTranscript
  } else {
    returnedTranscript = finalTranscript
  }

  const returnedTranslation = showHistory ? translationLog : translation

  return {
    transcript: returnedTranscript,
    translation1: returnedTranslation,
    listening,
    reset,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  }
}
