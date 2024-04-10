import { Icon, StringNumber } from '@/types/types'
import { FC } from 'react'
import Image from 'next/image'

// TODO: if the button has a very small size, remove children if there is an acitve icon

const COLOR_VARIANTS = {
    primary:
        'bg-cyan-400 hover:bg-cyan-500 active:bg-cyan-600 focus:outline-blue-600 focus:outline active:ring-2 ring-blue-200',

    primary_disabled: 'bg-cyan-300 focus:outline-yellow-300 focus:outline',
    primary_text: 'text-zinc-900',
    secondary:
        'bg-red-1000 hover:bg-red-1100 active:bg-red-1200 focus:outline-red-1200 focus:outline active:ring-2 ring-red-100',

    secondary_disabled: 'bg-red-400 focus:outline-yellow-300 focus:outline',
    secondary_text: 'text-slate-50',
}

type ButtonProps = {
    // not mandatory if icon is set
    children: StringNumber
    onClick: () => void

    // mandatory if child is no string or number
    ariaLable?: string
    disabled?: boolean

    // TODO: if href is present, the specified element is focussed after the button has been pressed
    href?: string
    icon?: Icon
    lang?: string
    secondary?: boolean
}

const Button: FC<ButtonProps> = ({
    ariaLable,
    children,
    disabled = false,
    href,
    icon,
    lang,
    onClick,
    secondary = false,
}) => {
    const THEME = secondary ? COLOR_VARIANTS.secondary : COLOR_VARIANTS.primary
    const THEME_DISABLED = secondary
        ? COLOR_VARIANTS.secondary_disabled
        : COLOR_VARIANTS.primary_disabled

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

    return !href ? (
        <button
            className={`${
                !disabled
                    ? `${THEME} cursor-pointer`
                    : `${THEME_DISABLED} cursor-not-allowed opacity-85`
            } ${
                secondary
                    ? COLOR_VARIANTS.secondary_text
                    : COLOR_VARIANTS.primary_text
            } rounded-md px-4 py-2 m-1.5 w-full flex text-balance justify-center font-semibold outline-offset-2 outline-2 text-lg`}
            onMouseDown={handleOnClick}
            onKeyDown={handleOnKeyDown}
            role="button"
            lang={lang}
            aria-label={
                ariaLable
                    ? `${ariaLable} ${disabled ? '. disabled' : ''}`
                    : accessibleText(children, disabled)
            }
            aria-disabled={disabled}
        >
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
        </button>
    ) : (
        <a>
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
