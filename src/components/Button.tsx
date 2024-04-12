import { Icon, StringNumber } from '@/types/types'
import { FC, useEffect, useState } from 'react'
import Image from 'next/image'

const COLOR_VARIANTS = {
    primary:
        'bg-cyan-450 hover:bg-cyan-500 active:bg-cyan-600 focus:outline-blue-600 focus:outline active:ring-2 ring-blue-200',

    primary_disabled: 'bg-cyan-250 focus:outline-stone-500 focus:outline',
    primary_text: 'text-stone-900',

    secondary:
        'bg-red-1000 hover:bg-red-1100 active:bg-red-1200 focus:outline-red-1200 focus:outline active:ring-2 ring-red-100',

    secondary_disabled: 'bg-red-400 focus:outline-stone-500 focus:outline',
    secondary_text: 'text-slate-50',

    dark: 'bg-stone-700 hover:bg-stone-800 active:bg-stone-900 focus:outline-stone-900 focus:outline active:ring-2 ring-stone-200',
    dark_disabled: 'bg-stone-450 focus:outline-stone-500 focus:outline',
    dark_text: 'text-stone-100',
}

type ConditionalLabelProps =
    | {
          children: StringNumber
          ariaLable?: string
          icon?: Icon
      }
    | {
          ariaLable: string
          icon: Icon
          children?: never
      }

type ButtonProps = {
    onClick: () => void
    disabled?: boolean

    // TODO: if href is present, the specified element is focussed after the button has been pressed
    href?: string
    lang?: string
    theme?: 'blue' | 'red' | 'dark'
}

type ThemeProps = {
    primary: string
    disabled: string
    text: string
}

const Button: FC<ButtonProps & ConditionalLabelProps> = ({
    ariaLable,
    children,
    disabled = false,
    href,
    icon,
    lang,
    onClick,
    theme = 'blue',
}) => {
    const themeSet: ThemeProps = (() => {
        switch (theme) {
            case 'blue':
                return {
                    primary: COLOR_VARIANTS.primary,
                    disabled: COLOR_VARIANTS.primary_disabled,
                    text: COLOR_VARIANTS.primary_text,
                }
            case 'red':
                return {
                    primary: COLOR_VARIANTS.secondary,
                    disabled: COLOR_VARIANTS.secondary_disabled,
                    text: COLOR_VARIANTS.secondary_text,
                }
            case 'dark':
                return {
                    primary: COLOR_VARIANTS.dark,
                    disabled: COLOR_VARIANTS.dark_disabled,
                    text: COLOR_VARIANTS.dark_text,
                }
        }
    })()

    const [buttonIsSmall, setButtonIsSmall] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setButtonIsSmall(window.innerWidth < 384)
        }
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const handleOnClick = () => {
        if (!disabled) {
            onClick()
        }
    }

    const handleOnKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
            onClick()
        }
    }

    // TODO: change 'disabled' according to selected language of the web page
    const accessibleText = (element: StringNumber, disabled: boolean) => {
        if (typeof element === 'number')
            return disabled
                ? `${element.toString()}. disabled`
                : element.toString()
        return disabled ? `${element}. 'disabled'` : element
    }

    const buttonClassName = `${
        !disabled
            ? `${themeSet.primary} cursor-pointer`
            : `${themeSet.disabled} cursor-not-allowed opacity-85`
    } ${
        themeSet.text
    } rounded-md px-4 py-2 m-1.5 w-full flex text-balance justify-center font-semibold outline-offset-2 outline-2 text-lg`

    const buttonAriaLable = ariaLable
        ? `${ariaLable}${disabled ? '. disabled' : ''}`
        : accessibleText(children!, disabled)

    return !href ? (
        <button
            className={buttonClassName}
            onMouseDown={handleOnClick}
            onKeyDown={handleOnKeyDown}
            role="button"
            lang={lang}
            aria-label={buttonAriaLable}
            aria-disabled={disabled}
        >
            <div className="flex items-center gap-4">
                {icon && (
                    <>
                        <Image
                            src={icon.src}
                            alt={icon.alt}
                            height={icon.size}
                            width={icon.size}
                        />
                        {!buttonIsSmall && children}
                    </>
                )}
                {!icon && children}
            </div>
        </button>
    ) : (
        <a href={href}>
            <div className="flex items-center gap-4">
                {icon && (
                    <Image
                        src={icon.src}
                        alt={icon.alt}
                        height={icon.size}
                        width={icon.size}
                    />
                )}
                {children}
            </div>
        </a>
    )
}

export default Button
