import { useFormInput } from '../lib/hooks/useFormInput'
import { Subtitler } from './Subtitler'
import { Input } from './Input'
import { Label } from './Label'
import { Range } from './Range'
import { CopyLinkButton } from './CopyLinkButton'
import { ColorInput } from './ColorInput'
import { LanguageSelect, translateLanguages } from './LanguageSelect'
import { FontPickerOrCustom } from './FontPickerOrCustom'

export function Main() {
  const { value, handler } = useFormInput()

  const {
    apiKey,
    hideConfig,
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
  } = value

  const {
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
  } = handler

  return (
    <>
      <Subtitler
        apiKey={apiKey}
        phraseSepTime={phraseSepTime}
        recogLang={recogLang}
        transLang={transLang}
        recogFont={useCustomRecogFont ? customRecogFont : recogFont}
        transFont={useCustomTransFont ? customTransFont : transFont}
        bgColor={bgColor}
        recogFontColor={recogFontColor}
        transFontColor={transFontColor}
        recogFontStrokeColor={recogFontStrokeColor}
        transFontStrokeColor={transFontStrokeColor}
        recogFontSize={recogFontSize}
        recogFontWeight={recogFontWeight}
        recogFontStrokeWidth={recogFontStrokeWidth}
        transFontSize={transFontSize}
        transFontWeight={transFontWeight}
        transFontStrokeWidth={transFontStrokeWidth}
        showFontTest={showFontTest}
        showHistory={showHistory}
        hideConfig={hideConfig}
        onToggleHideConfig={onToggleHideConfig}
        recogHeight={recogHeight}
        transHeight={transHeight}
        handleSwitch={handleSwitch}
      />
      {!hideConfig && (
        <div className="p-8 border border-gray-200">
          <h1 className="font-medium text-3xl">SubtitleKami</h1>
          <div className="mt-8 space-y-6">
            <form id="apiKeyForm" name="apiKeyForm">
              <div>
                {/* Better user experience storing API key as "password" in browser's password manager if we include a dummy username */}
                <label hidden={true} htmlFor="dummyUser" />
                <input
                  type="text"
                  name="dummyUser"
                  id="dummyUser"
                  autoComplete="username"
                  size={0}
                  hidden={true}
                  defaultValue="SubtitleKami"
                />
              </div>
              <div>
                <Label htmlFor="apiKey">API Key</Label>
                <Input
                  name="apiKey"
                  id="apiKey"
                  autoComplete="current-password"
                  onChange={onChangeApiKey}
                  defaultValue={apiKey}
                />
              </div>
            </form>
            <div>
              <Label htmlFor="phraseSepTime">Phrase separation time (ms)</Label>
              <Input
                name="phraseSepTime"
                id="phraseSepTime"
                onChange={onChangePhraseSepTime}
                defaultValue={phraseSepTime}
              />
            </div>
          </div>

          <div className="mt-8 grid lg:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="recogFontColor">Transcript Font Color</Label>
              <ColorInput
                name="recogFontColor"
                id="recogFontColor"
                defaultValue={recogFontColor}
                onChange={onChangeRecogFontColor}
              />
            </div>
            <div>
              <Label htmlFor="recogFontStrokeColor">Transcript Border Color</Label>
              <ColorInput
                name="recogFontStrokeColor"
                id="recogFontStrokeColor"
                defaultValue={recogFontStrokeColor}
                onChange={onChangeRecogFontStrokeColor}
              />
            </div>
            <div>
              <Label htmlFor="bgColor">Background Color</Label>
              <ColorInput
                name="bgColor"
                id="bgColor"
                defaultValue={bgColor}
                onChange={onChangeBgColor}
              />
            </div>
            <div>
              <Label htmlFor="transFontColor">Translation Font Color</Label>
              <ColorInput
                type="color"
                name="transFontColor"
                id="transFontColor"
                defaultValue={transFontColor}
                onChange={onChangeTransFontColor}
              />
            </div>
            <div>
              <Label htmlFor="transFontStrokeColor">Translation Border Color</Label>
              <ColorInput
                type="color"
                name="transFontStrokeColor"
                id="transFontStrokeColor"
                defaultValue={transFontStrokeColor}
                onChange={onChangeTransFontStrokeColor}
              />
            </div>
          </div>

          <div className="mt-8 grid lg:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="recogFontSize" value={recogFontSize + 'px'}>
                Transcript Size
              </Label>
              <Range
                name="recogFontSize"
                id="recogFontSize"
                min={8}
                max={64}
                step={2}
                defaultValue={recogFontSize}
                onChange={onChangeRecogFontSize}
              />
            </div>
            <div>
              <Label htmlFor="recogFontWeight" value={recogFontWeight + ''}>
                Transcript Weight
              </Label>
              <Range
                name="recogFontWeight"
                id="recogFontWeight"
                min={100}
                max={900}
                step={100}
                defaultValue={recogFontWeight}
                onChange={onChangeRecogFontWeight}
              />
            </div>
            <div>
              <Label htmlFor="recogFontStrokeWidth" value={recogFontStrokeWidth + 'px'}>
                Transcript Border
              </Label>
              <Range
                name="recogFontStrokeWidth"
                id="recogFontStrokeWidth"
                min={0}
                max={32}
                step={1}
                defaultValue={recogFontStrokeWidth}
                onChange={onChangeRecogFontStrokeWidth}
              />
            </div>
            <div>
              <Label htmlFor="transFontSize" value={transFontSize + 'px'}>
                Translation Size
              </Label>
              <Range
                name="transFontSize"
                id="transFontSize"
                min={8}
                max={64}
                step={2}
                defaultValue={transFontSize}
                onChange={onChangeTransFontSize}
              />
            </div>
            <div>
              <Label htmlFor="transFontWeight" value={transFontWeight + ''}>
                Translation Weight
              </Label>
              <Range
                name="transFontWeight"
                id="transFontWeight"
                min={100}
                max={900}
                step={100}
                defaultValue={transFontWeight}
                onChange={onChangeTransFontWeight}
              />
            </div>
            <div>
              <Label htmlFor="transFontStrokeWidth" value={transFontStrokeWidth + 'px'}>
                Translation Border
              </Label>
              <Range
                name="transFontStrokeWidth"
                id="transFontStrokeWidth"
                min={0}
                max={32}
                step={1}
                defaultValue={transFontStrokeWidth}
                onChange={onChangeTransFontStrokeWidth}
              />
            </div>
          </div>

          <div className="mt-8 grid lg:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="recogHeight" value={recogHeight + 'rem'}>
                Transcript Box Height
              </Label>
              <Range
                name="recogHeight"
                id="recogHeight"
                min={0}
                max={36}
                step={1}
                defaultValue={recogHeight}
                onChange={onChangeRecogHeight}
              />
            </div>
            <div>
              <Label htmlFor="transHeight" value={transHeight + 'rem'}>
                Translation Box Height
              </Label>
              <Range
                name="transHeight"
                id="transHeight"
                min={0}
                max={36}
                step={1}
                defaultValue={transHeight}
                onChange={onChangeTransHeight}
              />
            </div>
          </div>

          <div className="mt-8 grid lg:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="recogLang">
                Transcript Speech{' '}
                <sup>
                  <a
                    href="https://stackoverflow.com/questions/14257598"
                    target="_blank"
                    rel="noreferrer"
                  >
                    (supported languages)
                  </a>
                </sup>
              </Label>
              <span className="inline-flex gap-x-4">
                <LanguageSelect
                  id="recogLang"
                  value={recogLang}
                  label={translateLanguages[recogLang].english}
                  onChange={onChangeRecogLang}
                />
              </span>
            </div>
            <div>
              <Label htmlFor="recogFont">Transcript Font</Label>
              <FontPickerOrCustom
                id="recogFont"
                defaultValue={recogFont}
                defaultValueCustom={customRecogFont}
                onChange={onChangeRecogFont}
                onChangeCustom={onChangeCustomRecogFont}
                useCustom={useCustomRecogFont}
                onToggleCustom={onToggleCustomRecogFont}
              />
            </div>
            <div>
              <Label htmlFor="transLang">
                Translation{' '}
                <sup>
                  <a
                    href="https://cloud.google.com/translate/docs/languages"
                    target="_blank"
                    rel="noreferrer"
                  >
                    (supported languages)
                  </a>
                </sup>
              </Label>
              <span className="inline-flex gap-x-4">
                <LanguageSelect
                  id="transLang"
                  value={transLang}
                  label={translateLanguages[transLang].english}
                  onChange={onChangeTransLang}
                />
              </span>
            </div>
            <div>
              <Label htmlFor="transFont">Translation Font</Label>
              <FontPickerOrCustom
                id="transFont"
                defaultValue={transFont}
                defaultValueCustom={customTransFont}
                onChange={onChangeTransFont}
                onChangeCustom={onChangeCustomTransFont}
                useCustom={useCustomTransFont}
                onToggleCustom={onToggleCustomTransFont}
              />
            </div>
          </div>
          <div className="mt-8 grid lg:grid-cols-2 gap-4">
            <div>
              <CopyLinkButton />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <span className="inline-flex gap-x-4 h-4 items-baseline">
                <input
                  id="showFontTest"
                  name="showFontTest"
                  type="checkbox"
                  checked={showFontTest}
                  onChange={onChangeShowFontTest}
                  className="disabled:opacity-50"
                />
                <Label htmlFor="showFontTest">Show font test?</Label>
              </span>
              <span className="inline-flex gap-x-4 h-4 items-baseline">
                <input
                  id="showHistory"
                  name="showHistory"
                  type="checkbox"
                  checked={showHistory}
                  onChange={onChangeShowHistory}
                  className="disabled:opacity-50"
                />
                <Label htmlFor="showHistory">Show history?</Label>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
