import { useEffect, useState } from 'react'

export const useResize = (maxWidth: number): boolean => {
    const [isResize, setIsResize] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setIsResize(window.innerWidth < maxWidth)
        }
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return isResize
}
