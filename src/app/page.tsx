'use client'

import Accordion from '@/components/Accordion/Accordion'
import Image from 'next/image'
import starImage from './star.png'

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="w-full items-top justify-between font-sans text-sm lg:flex flex-wrap">
                <Accordion header="Header 1">
                    Content of the Accordion 1
                </Accordion>
                <Accordion header="Header 2" disabled startExpanded>
                    Content of the Accordion 2
                </Accordion>
                <Accordion header="Header 3">{187}</Accordion>
                <Accordion header="Header 4">
                    {<div>Hello World!</div>}
                </Accordion>
                <Accordion header="Header 5">
                    {
                        <div>
                            <Image
                                src={starImage}
                                alt="A happy star which is smiling at you"
                                width={75}
                            />
                        </div>
                    }
                </Accordion>
                <Accordion header="Header 5">
                    <div>Hello Michi!</div>
                </Accordion>
                <Accordion header="Header 5">
                    <div>
                        Hello Michi!
                        <div>Hello World!</div>
                    </div>
                </Accordion>
            </div>
        </main>
    )
}
