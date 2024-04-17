'use client'

import Toggle from '@/components/Toggle'
import starImage from './star.png'
import emailImage from './email.png'

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Toggle textOff="OFF" textOn="ON" arialabel="light switch" />
            <Toggle
                textOff="OFF"
                textOn="ON"
                arialabel="light switch"
                disabled
            />
            <Toggle
                textOff="aus"
                textOn="an"
                arialabel="light switch"
                theme="dark"
            />
            <Toggle
                textOff="aus"
                textOn="an"
                arialabel="light switch"
                theme="dark"
                disabled
            />
            <Toggle
                imageOff={{ src: starImage }}
                imageOn={{ src: emailImage }}
                theme="red"
                arialabel="light switch"
            />
            <Toggle
                imageOff={{ src: starImage }}
                imageOn={{ src: emailImage }}
                theme="red"
                arialabel="light switch"
                disabled
            />
        </main>
    )
}
