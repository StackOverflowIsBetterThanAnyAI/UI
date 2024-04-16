import { FC } from 'react'
import Button from './Button'
import { StringNumber } from '@/types/types'
import emailIcon from './../app/email.png'
import { useResize } from '@/hooks/useResize'

type EmailProps = {
    emailAdress: string
    recipient: string
    children: StringNumber
    disabled?: boolean
    theme?: 'blue' | 'red' | 'dark'
}

const MAX_TEXT_LENGTH = 12

export const Email: FC<EmailProps> = ({
    children,
    disabled = false,
    emailAdress,
    recipient,
    theme = 'blue',
}) => {
    const textIsTooBig = useResize(460)

    const truncateText = (text: StringNumber, maxLength: number): string => {
        if (typeof text === 'number') text = text.toString()
        if (text.length > maxLength && textIsTooBig) {
            return text.substring(0, maxLength) + '...'
        }
        return text
    }

    return (
        <Button
            href={`mailto:${emailAdress}`}
            disabled={disabled}
            ariaLable={`Send an email to ${recipient}`}
            icon={{
                src: emailIcon,
                alt: `Send an email to ${recipient}`,
            }}
            theme={theme}
        >
            {children}
        </Button>
    )
}
