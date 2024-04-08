import { Icon, StringNumber } from '@/types/types'
import { FC } from 'react'
import Image from 'next/image'

// TODO: if the button has a very small size, remove children if there is an acitve icon

const COLOR_VARIANTS = {
    primary: 'bg-cyan-300 hover:bg-cyan-400 active:bg-cyan-500',
    primary_disabled: 'bg-cyan-200',
    secondary: 'bg-red-400',
    text: 'text-gray-800',
    background: 'bg-slate-200',
}

type ButtonProps = {
    children: StringNumber
    onClick: () => void
    ariaLable?: string
    disabled?: boolean
    icon?: Icon
    lang?: string
}

const Button: FC<ButtonProps> = ({
    ariaLable,
    children,
    disabled = false,
    icon,
    lang,
    onClick,
}) => {
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

    const accessibleText = (element: StringNumber) => {
        if (typeof element === 'number') return element.toString()
        return element
    }

    return (
        <button
            className={`${
                !disabled
                    ? `${COLOR_VARIANTS.primary} cursor-pointer`
                    : `${COLOR_VARIANTS.primary_disabled} cursor-not-allowed opacity-85`
            } ${
                COLOR_VARIANTS.text
            } rounded-md px-4 py-2 m-1 w-full flex text-balance justify-center font-semibold`}
            onMouseDown={handleOnClick}
            onKeyDown={handleOnKeyDown}
            role="button"
            lang={lang}
            aria-label={ariaLable ?? accessibleText(children)}
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
    )
}

export default Button
