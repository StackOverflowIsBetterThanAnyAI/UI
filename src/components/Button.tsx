import { Icon, StringNumber } from '@/types/types'
import { CSSProperties, FC } from 'react'
import Image from 'next/image'
import { useResize } from '@/hooks/useResize'
import { useScreenWidth } from '@/hooks/useScreenWidth'
import { accessibleText } from '@/helper/accessibleText'

// TODO: if href is present, the specified element is focussed after the button has been pressed
// TODO: custom method which makes all images look the same
// some images could be extremely wide but are capped to the same width
// TODO: implement react router

const COLOR_VARIANTS = {
    primary:
        'bg-cyan-450 hover:bg-cyan-500 active:bg-cyan-600 focus:outline-blue-600 focus:outline active:ring-2 ring-blue-200',

    primary_disabled: 'bg-cyan-250 focus:outline-stone-500 focus:outline',
    primary_text: 'text-stone-900',

    secondary:
        'bg-red-1000 hover:bg-red-1100 active:bg-red-1200 focus:outline-red-1200 focus:outline active:ring-2 ring-red-100',
    secondary_disabled: 'bg-red-400 focus:outline-stone-500 focus:outline',
    secondary_text: 'text-stone-50',

    dark: 'bg-stone-700 hover:bg-stone-800 active:bg-stone-900 focus:outline-stone-900 focus:outline active:ring-2 ring-stone-200',
    dark_disabled: 'bg-stone-450 focus:outline-stone-500 focus:outline',
    dark_text: 'text-stone-100',
}

type ConditionalLabelProps =
    | {
          children: StringNumber
          arialabel?: string
          icon?: Omit<Icon, 'href'>
      }
    | {
          arialabel: string
          icon: Omit<Icon, 'href'>
          children?: never
      }

type ConditionalHrefProps =
    | {
          href?: never
          onClick: () => void
      }
    | {
          href: string
          onClick?: () => void
      }

type ButtonProps = {
    disabled?: boolean
    lang?: string
    theme?: 'blue' | 'red' | 'dark'
}

type ThemeProps = {
    primary: string
    disabled: string
    text: string
}

const Button: FC<
    ButtonProps & ConditionalLabelProps & ConditionalHrefProps
> = ({
    arialabel,
    children,
    disabled = false,
    href,
    icon,
    lang,
    onClick,
    theme = 'dark',
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

    // checks if icon can be hidden
    const buttonIsSmall = useResize(384)
    // checks if the current viewport is mobile, tablet or desktop
    const screenWidth = useScreenWidth()

    const getImageSize = (): number => {
        switch (screenWidth) {
            case 'MOBILE':
                return 25
            case 'TABLET':
                return 35
            case 'DESKTOP':
                return 40
        }
    }
    const imageSize = getImageSize()

    const handleOnClick = () => {
        if (!disabled) {
            onClick && onClick()
        }
    }

    const handleOnKeyDownButton = (
        e: React.KeyboardEvent<HTMLButtonElement>
    ) => {
        if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
            onClick && onClick()
        }
    }

    const handleOnKeyDownAnchor = (
        e: React.KeyboardEvent<HTMLAnchorElement>
    ) => {
        if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
            onClick && onClick()
        }
    }

    const buttonClassName = `${
        !disabled
            ? `${themeSet.primary} cursor-pointer`
            : `${themeSet.disabled} cursor-not-allowed opacity-85`
    } ${
        themeSet.text
    } rounded-md px-4 py-2 w-full max-w-64 min-w-24 flex text-balance justify-center font-semibold outline-offset-2 outline-2 lg:text-xl sm:text-lg text-base`

    const buttonArialabel = arialabel
        ? `${arialabel}${disabled ? '. disabled' : ''}`
        : accessibleText(children!, disabled)

    const truncateText: CSSProperties = {
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 2,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: '100%',
    }

    return !href ? (
        <button
            className={buttonClassName}
            onMouseDown={handleOnClick}
            onKeyDown={handleOnKeyDownButton}
            role="button"
            lang={lang}
            aria-label={buttonArialabel}
            aria-disabled={disabled}
        >
            <div className="flex items-center gap-4">
                {icon && (
                    <>
                        <Image
                            src={icon.src}
                            alt={icon.alt}
                            height={imageSize}
                        />
                        {!buttonIsSmall && (
                            <div
                                className="text-left text-wrap"
                                style={truncateText}
                            >
                                {children}
                            </div>
                        )}
                    </>
                )}
                {!icon && <div style={truncateText}>{children}</div>}
            </div>
        </button>
    ) : (
        <a
            href={disabled ? undefined : href}
            className={buttonClassName}
            onMouseDown={onClick && handleOnClick}
            onKeyDown={handleOnKeyDownAnchor}
            role="button"
            lang={lang}
            aria-label={buttonArialabel}
            aria-disabled={disabled}
        >
            <div className="flex items-center gap-4">
                {icon && (
                    <>
                        <Image
                            src={icon.src}
                            alt={icon.alt}
                            height={imageSize}
                        />
                        {!buttonIsSmall && (
                            <div
                                className="text-left text-wrap"
                                style={truncateText}
                            >
                                {children}
                            </div>
                        )}
                    </>
                )}
                {!icon && <div style={truncateText}>{children}</div>}
            </div>
        </a>
    )
}

export default Button
