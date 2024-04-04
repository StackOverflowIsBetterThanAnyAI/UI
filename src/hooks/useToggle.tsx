import { useState } from 'react'

type ToggleHook = {
    status: boolean
    toggleStatus: () => void
}

type ToggleProps = {
    startValue?: boolean
}

const useToggle = ({ startValue }: ToggleProps): ToggleHook => {
    const [status, setStatus] = useState(startValue || false)

    const toggleStatus = () => {
        setStatus((prevStatus) => !prevStatus)
    }

    return { status, toggleStatus }
}

export default useToggle
