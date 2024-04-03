import React, { FC, ReactNode, useEffect, useState } from 'react'

type AccordionProps = {
    header: string
    children: ReactNode
    disabled?: boolean
}

const Accordion: FC<AccordionProps> = ({
    header,
    children,
    disabled = false,
}) => {
    // is the panel visible?
    const [expanded, setExpanded] = useState(true)
    const toggleContent = () => {
        setExpanded(!expanded)
    }

    // value for the aria-labelledby ID
    const [headerId, setHeaderId] = useState('')
    // value for the aria-controls ID
    const [panelId, setPanelId] = useState('')

    // sets the IDs for the header and the panel
    const setId = () => {
        setHeaderId(uniqueID())
        setPanelId(uniqueID())
    }

    // clean up function
    const resetId = () => {
        setHeaderId('')
        setPanelId('')
    }

    // sets IDs on mount
    useEffect(() => {
        setId()
        return () => {
            resetId()
        }
    }, [])

    return (
        <div className="bg-slate-200 p-1 m-1 max-w-72 rounded-lg">
            <div role="heading" aria-level={3}>
                <button
                    className={`${
                        !disabled
                            ? 'hover:bg-cyan-300 active:bg-cyan-400 cursor-pointer'
                            : 'cursor-default'
                    } bg-cyan-200 text-gray-800 rounded-md p-2 w-full flex justify-between items-center text-balance`}
                    onClick={!disabled ? toggleContent : undefined}
                    id={headerId}
                    role="button"
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    aria-pressed={!disabled ? expanded : undefined}
                    aria-disabled={disabled}
                >
                    {header}
                    <span>{disabled ? '' : expanded ? '-' : '+'}</span>
                </button>
            </div>
            {expanded && (
                <div
                    className="p-2 bg-red-400 rounded-md mt-1 text-balance"
                    id={panelId}
                    aria-labelledby={headerId}
                >
                    {children}
                </div>
            )}
        </div>
    )
}

const uniqueID = () => {
    let returnedID = ''
    for (let i = 0; i < 16; i++) {
        returnedID += String.fromCharCode(Math.floor(Math.random() * 25) + 97)
    }
    return returnedID
}

export default Accordion
