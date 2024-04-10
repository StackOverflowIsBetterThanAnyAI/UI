'use client'

import Accordion from '@/components/Accordion'
import Button from '@/components/Button'

import starImage from './star.png'

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="w-full items-top justify-between text-sm lg:flex flex-wrap">
                <Accordion header="Header 1">
                    Content of the Accordion 1
                </Accordion>
                <Accordion header="Header 2" disabled startExpanded>
                    Content of the Accordion 2
                </Accordion>
            </div>
            <div>
                <Button
                    ariaLable="eins acht sieben"
                    lang="de"
                    onClick={() => console.log()}
                >
                    {187}
                </Button>
                <Button onClick={() => console.log()} secondary>
                    Hello World
                </Button>
                <Button
                    onClick={() => console.log()}
                    secondary
                    disabled
                    ariaLable="Hello Michael"
                >
                    Hello World
                </Button>
                <Button
                    disabled
                    onClick={() => console.log()}
                    icon={{
                        src: starImage,
                        alt: 'a happy star which is smiling at you',
                        size: 50,
                    }}
                >
                    Hello World Image
                </Button>
                <Button
                    onClick={() => console.log()}
                    href="#"
                    icon={{
                        src: starImage,
                        alt: 'a happy star which is smiling at you',
                        size: 50,
                    }}
                >
                    Hello World Href
                </Button>
                <Button
                    onClick={() => console.log()}
                    icon={{
                        src: starImage,
                        alt: 'a happy star which is smiling at you',
                        size: 250,
                    }}
                >
                    Hello World
                </Button>
            </div>
        </main>
    )
}
