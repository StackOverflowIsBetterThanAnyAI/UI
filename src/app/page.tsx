'use client'

import Toggle from '@/components/Toggle'
import Footer from '@/components/Footer'

import emailIcon from './email.png'

export default function Home() {
    return (
        <>
            <main className="flex flex-col items-center p-24 bg-red-300 max-w-screen-lg w-full">
                <Toggle textOff="OFF" textOn="ON" arialabel="light switch" />
                <Toggle textOff="OFF" textOn="ON" arialabel="light switch" />
                <Toggle textOff="OFF" textOn="ON" arialabel="light switch" />
            </main>
            <Footer
                logo={{
                    src: emailIcon,
                    alt: 'email',
                    href: '#',
                }}
                theme="red"
                content={[
                    {
                        header: 'Sportarten',
                        items: [
                            'Fußball',
                            'Motorsport',
                            'Darts',
                            'US-Sport',
                            'Olympia',
                        ],
                    },
                    {
                        header: 'Social Media',
                        items: [
                            'Facebook',
                            'Instagram',
                            'X',
                            'TikTok',
                            'YouTube',
                        ],
                    },
                    {
                        header: 'Video',
                        items: [
                            'Mediathek',
                            'Livestream',
                            'Podcasts',
                            'Doppelpass',
                        ],
                    },
                    {
                        header: 'Service',
                        items: [
                            'News-App',
                            'Liveticker',
                            'eSPORTS1',
                            'Sport1+',
                            'Sport1 Darts',
                        ],
                    },
                    {
                        header: 'Mehr',
                        items: [
                            'TV-Programm',
                            'Sportquiz',
                            'Tippspiel',
                            'Sportwetten',
                            'Sport1 Akademie',
                        ],
                    },
                    {
                        header: 'Über uns',
                        items: [
                            'Unternehmen',
                            'Karriere',
                            'Kontakt',
                            'Presse',
                            'Sport1 Business',
                        ],
                    },
                ]}
            />
        </>
    )
}
