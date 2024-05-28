import { Icon, StringNumber } from '@/types/types'
import { CSSProperties, FC } from 'react'
import Image from 'next/image'
import { useResize } from '@/hooks/useResize'
import { useScreenWidth } from '@/hooks/useScreenWidth'
import { accessibleText } from '@/helper/accessibleText'

// TODO: implement react router

const COLOR_VARIANTS = {
    blue: 'decoration-cyan-450 hover:decoration-cyan-500 active:decoration-cyan-600 focus:outline-blue-600 focus:outline active:ring-2 ring-blue-200',
    blue_disabled: 'decoration-cyan-250',
    blue_text: 'text-stone-900',

    red: 'decoration-red-1000 hover:decoration-red-1100 active:decoration-red-1200 focus:outline-red-1200 focus:outline active:ring-2 ring-red-100',
    red_disabled: 'decoration-red-400',
    red_text: 'text-stone-50',

    yellow: 'decoration-yellow-400 hover:decoration-yellow-600 active:decoration-yellow-700 focus:outline-yellow-400 focus:outline active:ring-2 ring-yellow-600',
    yellow_disabled: 'decoration-yellow-500',
    yellow_text: 'text-stone-50',

    dark: 'decoration-stone-700 hover:decoration-stone-800 active:decoration-stone-900 focus:outline-stone-900 focus:outline active:ring-2 ring-stone-200',
    dark_disabled: 'decoration-stone-450',
    dark_text: 'text-stone-700',

    light: 'decoration-stone-100 hover:decoration-stone-300 hover:text-stone-300 active:decoration-stone-500 active:text-stone-500 focus:outline-stone-100 focus:outline active:ring-2 ring-stone-500',
    light_disabled: 'decoration-stone-450',
    light_text: 'text-stone-100',

    light_background: 'bg-stone-50',
    dark_background: 'bg-stone-950',
}

type ConditionalLabelProps =
    | {
          children: StringNumber
          arialabel?: never
          icon?: never
      }
    | {
          arialabel: string
          icon: Omit<Icon, 'href'>
          children?: never
      }

type ButtonProps = {
    href: string
    disabled?: boolean
    lang?: string
    onClick?: () => void
    theme?: 'blue' | 'red' | 'yellow' | 'dark' | 'light'
    background?: 'light' | 'dark' | 'none'
}

type ThemeProps = {
    primary: string
    disabled: string
    text: string
}

const Link: FC<ButtonProps & ConditionalLabelProps> = ({
    arialabel,
    background = 'none',
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
                    primary: COLOR_VARIANTS.blue,
                    disabled: COLOR_VARIANTS.blue_disabled,
                    text: COLOR_VARIANTS.blue_text,
                }
            case 'red':
                return {
                    primary: COLOR_VARIANTS.red,
                    disabled: COLOR_VARIANTS.red_disabled,
                    text: COLOR_VARIANTS.red_text,
                }
            case 'yellow':
                return {
                    primary: COLOR_VARIANTS.yellow,
                    disabled: COLOR_VARIANTS.yellow_disabled,
                    text: COLOR_VARIANTS.yellow_text,
                }
            case 'dark':
                return {
                    primary: COLOR_VARIANTS.dark,
                    disabled: COLOR_VARIANTS.dark_disabled,
                    text: COLOR_VARIANTS.dark_text,
                }
            case 'light':
                return {
                    primary: COLOR_VARIANTS.light,
                    disabled: COLOR_VARIANTS.light_disabled,
                    text: COLOR_VARIANTS.light_text,
                }
        }
    })()

    const backgroundColor = (() => {
        switch (background) {
            case 'dark':
                return COLOR_VARIANTS.dark_background
            case 'light':
                return COLOR_VARIANTS.light_background
            case 'none':
                return ''
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
            case 'TABLET SMALL':
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
    } ${themeSet.text} ${backgroundColor}
    rounded-md w-full ${
        icon && 'min-w-24'
    } flex text-balance justify-center outline-offset-2 outline-2 lg:text-lg sm:text-base text-sm underline decoration-2`

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

    return (
        <a
            href={disabled ? undefined : href}
            className={buttonClassName}
            onMouseDown={onClick && handleOnClick}
            onKeyDown={handleOnKeyDownAnchor}
            role="button"
            lang={lang}
            aria-label={buttonArialabel}
            aria-disabled={disabled}
            target={href.startsWith('https://') ? '_blank' : undefined}
        >
            <div className="flex items-center">
                {icon && (
                    <>
                        <Image
                            src={icon.src}
                            alt={icon.alt}
                            height={imageSize}
                            loading="lazy"
                            className="hover:opacity-80"
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

export default Link
