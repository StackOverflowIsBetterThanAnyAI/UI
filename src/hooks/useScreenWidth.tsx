import { useEffect, useState } from 'react'

export const useScreenWidth = ():
    | 'MOBILE'
    | 'TABLET SMALL'
    | 'TABLET'
    | 'DESKTOP' => {
    const [screenWidth, setScreenWidth] = useState<
        'MOBILE' | 'TABLET SMALL' | 'TABLET' | 'DESKTOP'
    >('MOBILE')

    useEffect(() => {
        const handleScreenWidth = () => {
            if (window.innerWidth < 384) {
                setScreenWidth('MOBILE')
            } else if (window.innerWidth < 768) {
                setScreenWidth('TABLET SMALL')
            } else if (window.innerWidth < 1024) {
                setScreenWidth('TABLET')
            } else setScreenWidth('DESKTOP')
        }
        window.addEventListener('resize', handleScreenWidth)
        handleScreenWidth()
        return () => {
            window.removeEventListener('resize', handleScreenWidth)
        }
    }, [])

    return screenWidth
}
