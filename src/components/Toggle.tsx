import { useToggle } from '@/hooks/useToggle'
import { Icon, StringNumber } from '@/types/types'
import { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import { useScreenWidth } from '@/hooks/useScreenWidth'
import { accessibleText } from '@/helper/accessibleText'

const COLOR_VARIANTS = {
    primary:
        'bg-cyan-450 active:bg-cyan-600 focus:outline-blue-600 focus:outline active:ring-2 ring-blue-200',

    primary_disabled: 'bg-cyan-250 focus:outline-stone-500 focus:outline',
    primary_text: 'text-stone-900',
    primary_slider: 'bg-stone-450',

    secondary:
        'bg-red-1000 active:bg-red-1200 focus:outline-red-1200 focus:outline active:ring-2 ring-red-100',
    secondary_disabled: 'bg-red-400 focus:outline-stone-500 focus:outline',
    secondary_text: 'text-stone-50',
    secondary_slider: 'bg-stone-400',

    dark: 'bg-stone-700 active:bg-stone-900 focus:outline-stone-900 focus:outline active:ring-2 ring-stone-200',
    dark_disabled: 'bg-stone-450 focus:outline-stone-500 focus:outline',
    dark_text: 'text-stone-100',
    dark_slider: 'bg-stone-350',
}

type ConditionalInfoProps =
    | {
          imageOn: Omit<Icon, 'alt' | 'href'>
          imageOff: Omit<Icon, 'alt' | 'href'>
          textOn?: never
          textOff?: never
      }
    | {
          imageOn?: never
          imageOff?: never
          textOn: StringNumber
          textOff: StringNumber
      }

type ToggleProps = {
    arialabel: string
    disabled?: boolean
    lang?: string
    startTrue?: boolean
    theme?: 'blue' | 'red' | 'dark'
}

type ThemeProps = {
    primary: string
    disabled: string
    text: string
    slider: string
}

const Toggle: FC<ToggleProps & ConditionalInfoProps> = ({
    arialabel,
    disabled = false,
    imageOff,
    imageOn,
    lang,
    startTrue = false,
    textOff,
    textOn,
    theme = 'blue',
}) => {
    const themeSet: ThemeProps = (() => {
        switch (theme) {
            case 'blue':
                return {
                    primary: COLOR_VARIANTS.primary,
                    disabled: COLOR_VARIANTS.primary_disabled,
                    text: COLOR_VARIANTS.primary_text,
                    slider: COLOR_VARIANTS.primary_slider,
                }
            case 'red':
                return {
                    primary: COLOR_VARIANTS.secondary,
                    disabled: COLOR_VARIANTS.secondary_disabled,
                    text: COLOR_VARIANTS.secondary_text,
                    slider: COLOR_VARIANTS.secondary_slider,
                }
            case 'dark':
                return {
                    primary: COLOR_VARIANTS.dark,
                    disabled: COLOR_VARIANTS.dark_disabled,
                    text: COLOR_VARIANTS.dark_text,
                    slider: COLOR_VARIANTS.dark_slider,
                }
        }
    })()
    const { status: isActivated, toggleStatus: handleIsActivated } = useToggle({
        startValue: startTrue,
    })
    const screenWidth = useScreenWidth()

    // dynamically change aria-label with current toggle value
    const [toggleAriaLabel, setToggleAriaLabel] = useState(
        `${accessibleText(arialabel, disabled)}. ${
            isActivated
                ? textOn
                    ? textOn
                    : 'activated'
                : textOff
                ? textOff
                : 'not activated'
        }`
    )

    useEffect(() => {
        setToggleAriaLabel(
            `${accessibleText(arialabel, disabled)}. ${
                isActivated
                    ? textOn
                        ? textOn
                        : 'activated'
                    : textOff
                    ? textOff
                    : 'not activated'
            }`
        )
    }, [isActivated])

    const getImageSize = (): number => {
        switch (screenWidth) {
            case 'MOBILE':
                return 30
            default:
                return 35
        }
    }
    const imageSize = getImageSize()

    const handleOnClick = () => {
        handleIsActivated()
    }

    const iconOn = () => {
        return imageOn ? (
            <Image alt="" src={imageOn.src} height={imageSize} />
        ) : undefined
    }

    const iconOff = () => {
        return imageOff ? (
            <Image alt="" src={imageOff.src} height={imageSize} />
        ) : undefined
    }

    const buttonClassName = `${
        !disabled
            ? `${themeSet.primary} cursor-pointer`
            : `${themeSet.disabled} cursor-not-allowed opacity-85`
    } ${
        themeSet.text
    } flex items-center p-1.5 m-1 w-32 rounded-2xl lg:text-xl sm:text-lg text-base`

    const spanClassName = `block absolute left-0 w-8 h-8 rounded-full bg-stone-50 drop-shadow-md transition-transform duration-300 ease-in-out transform ${
        isActivated ? 'translate-x-full' : ''
    }`

    return (
        <button
            className={buttonClassName}
            onClick={!disabled ? handleOnClick : undefined}
            lang={lang}
            aria-label={toggleAriaLabel}
            aria-disabled={disabled}
            aria-checked={!disabled ? isActivated : undefined}
            role="switch"
        >
            <span
                className={`relative mr-2 w-16 h-8 rounded-full ${themeSet.slider}`}
            >
                <span className={spanClassName} />
            </span>
            {textOn && textOff ? (
                <span>{isActivated ? textOn : textOff}</span>
            ) : undefined}
            {iconOn() && iconOff() ? (
                <span>{isActivated ? iconOn() : iconOff()}</span>
            ) : undefined}
        </button>
    )
}

export default Toggle
