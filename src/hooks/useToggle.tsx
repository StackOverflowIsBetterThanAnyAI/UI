import { useState } from 'react'

type ToggleHook = {
    status: boolean
    toggleStatus: () => void
}

type ToggleProps = {
    startValue?: boolean
}

export const useToggle = ({ startValue }: ToggleProps): ToggleHook => {
    const [status, setStatus] = useState(startValue || false)

    const toggleStatus = () => {
        setStatus((prevStatus) => !prevStatus)
    }

    return { status, toggleStatus }
}
