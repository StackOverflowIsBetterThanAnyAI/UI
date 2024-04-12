'use client'

import Accordion from '@/components/Accordion'
import Button from '@/components/Button'

import starImage from './star.png'

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="w-full items-top justify-between text-sm lg:flex flex-wrap">
                <Accordion header="Header 1" id="header1">
                    Content of the Accordion 1
                </Accordion>
                <Accordion
                    header="Header 2"
                    disabled
                    startExpanded
                    id="header2"
                >
                    Content of the Accordion 2
                </Accordion>
                <Accordion header="Header 3" dark id="header3">
                    Content of the Accordion 3
                </Accordion>
                <Accordion
                    header="Header 4"
                    disabled
                    startExpanded
                    dark
                    id="header4"
                >
                    Content of the Accordion 4
                </Accordion>
            </div>
            <div>
                <Button lang="de" onClick={() => console.log()}>
                    {187}
                </Button>
                <Button lang="de" onClick={() => console.log()} disabled>
                    {187}
                </Button>
                <Button
                    lang="de"
                    onClick={() => console.log()}
                    theme="red"
                    ariaLable="Hello World"
                    icon={{
                        src: starImage,
                        alt: 'a happy star which is smiling at you',
                        size: 50,
                    }}
                />
                <Button
                    lang="de"
                    onClick={() => console.log()}
                    theme="red"
                    disabled
                    ariaLable="Hello World"
                    icon={{
                        src: starImage,
                        alt: 'a happy star which is smiling at you',
                        size: 50,
                    }}
                />
                <Button
                    onClick={() => console.log()}
                    theme="dark"
                    ariaLable="Hello Michael"
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
                    theme="dark"
                    ariaLable="Hello Michael"
                    icon={{
                        src: starImage,
                        alt: 'a happy star which is smiling at you',
                        size: 50,
                    }}
                    disabled
                >
                    Hello World Image
                </Button>
            </div>
            <div>
                <Button lang="de" onClick={() => console.log()} href="#header1">
                    {187}
                </Button>
                <Button
                    lang="de"
                    onClick={() => console.log()}
                    disabled
                    href="#"
                >
                    {187}
                </Button>
                <Button
                    lang="de"
                    onClick={() => console.log()}
                    theme="red"
                    ariaLable="Hello World"
                    icon={{
                        src: starImage,
                        alt: 'a happy star which is smiling at you',
                        size: 50,
                    }}
                    href="#"
                />
                <Button
                    lang="de"
                    onClick={() => console.log()}
                    theme="red"
                    disabled
                    ariaLable="Hello World"
                    icon={{
                        src: starImage,
                        alt: 'a happy star which is smiling at you',
                        size: 50,
                    }}
                    href="#"
                />
                <Button
                    onClick={() => console.log()}
                    theme="dark"
                    ariaLable="Hello Michael"
                    icon={{
                        src: starImage,
                        alt: 'a happy star which is smiling at you',
                        size: 50,
                    }}
                    href="#"
                >
                    Hello World Image
                </Button>
                <Button
                    onClick={() => console.log()}
                    theme="dark"
                    ariaLable="Hello Michael"
                    icon={{
                        src: starImage,
                        alt: 'a happy star which is smiling at you',
                        size: 50,
                    }}
                    disabled
                    href="#"
                >
                    Hello World Image
                </Button>
            </div>
        </main>
    )
}
