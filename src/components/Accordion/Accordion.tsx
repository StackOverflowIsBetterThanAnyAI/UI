import useToggle from '@/hooks/useToggle'
import React, { FC, useEffect, useState } from 'react'
import { FaChevronUp, FaChevronDown } from 'react-icons/fa'

type AccordionProps = {
    header: string
    children: string
    disabled?: boolean
    startValue?: boolean
}

const Accordion: FC<AccordionProps> = ({
    header,
    children,
    disabled = false,
    startValue = false,
}) => {
    // toggle expanded status of content
    const { status: expanded, toggleStatus: toggleExpanded } = useToggle({
        startValue,
    })

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
        <div className="bg-slate-200 p-1 m-1 max-w-72 min-w-36 rounded-lg">
            <AccordionHeader
                disabled={disabled}
                toggleExpanded={toggleExpanded}
                expanded={expanded}
                headerId={headerId}
                panelId={panelId}
                header={header}
            />
            <AccordionPanel
                expanded={expanded}
                panelId={panelId}
                headerId={headerId}
                children={children}
            />
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

const AccordionHeader = (props: {
    disabled: boolean
    toggleExpanded: () => void
    expanded: boolean
    headerId: string
    panelId: string
    header: string
}) => {
    const { disabled, toggleExpanded, expanded, headerId, panelId, header } =
        props

    return (
        <div role="heading" aria-level={3}>
            <button
                className={`${
                    !disabled
                        ? 'hover:bg-cyan-300 active:bg-cyan-400 cursor-pointer'
                        : 'cursor-default'
                } bg-cyan-200 text-gray-800 rounded-md p-2 w-full flex justify-between gap-8 items-center text-balance text-left font-semibold`}
                onClick={!disabled ? toggleExpanded : undefined}
                id={headerId}
                role="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                aria-pressed={!disabled ? expanded : undefined}
                aria-disabled={disabled}
            >
                {header}
                <AccordionIcon disabled={disabled} expanded={expanded} />
            </button>
        </div>
    )
}

const AccordionPanel = (props: {
    expanded: boolean
    panelId: string
    headerId: string
    children: string
}) => {
    const { expanded, panelId, headerId, children } = props

    return (
        expanded && (
            <div
                className="p-2 bg-red-400 rounded-md mt-1 text-balance"
                id={panelId}
                aria-labelledby={headerId}
                tabIndex={0}
            >
                {children}
            </div>
        )
    )
}

const AccordionIcon = (props: { disabled: boolean; expanded: boolean }) => {
    const { disabled, expanded } = props

    return (
        <span>
            {disabled ? '' : expanded ? <FaChevronUp /> : <FaChevronDown />}
        </span>
    )
}

export default Accordion
