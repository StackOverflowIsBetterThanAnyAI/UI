import uniqueID from '@/helper/uniqueID'
import useToggle from '@/hooks/useToggle'
import React, { FC, useEffect, useState } from 'react'

type AccordionProps = {
    header: string
    children: string
    disabled?: boolean
    startExpanded?: boolean
}

const Accordion: FC<AccordionProps> = ({
    header,
    children,
    disabled = false,
    startExpanded = false,
}) => {
    // toggle expanded status of content
    const { status: expanded, toggleStatus: handleToggleExpanded } = useToggle({
        startValue: startExpanded,
    })

    // value for the aria-labelledby ID
    const [headerId, setHeaderId] = useState<string>('')
    // value for the aria-controls ID
    const [panelId, setPanelId] = useState<string>('')

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

    const handleClosePanel = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
            handleToggleExpanded()
        }
    }

    return (
        <div className="bg-slate-200 p-1 m-1 max-w-72 min-w-36 rounded-lg">
            <AccordionHeader
                disabled={disabled}
                handleToggleExpanded={handleToggleExpanded}
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
                handleClosePanel={handleClosePanel}
            />
        </div>
    )
}

const AccordionHeader = (props: {
    disabled: boolean
    handleToggleExpanded: () => void
    expanded: boolean
    headerId: string
    panelId: string
    header: string
}) => {
    const {
        disabled,
        handleToggleExpanded,
        expanded,
        headerId,
        panelId,
        header,
    } = props

    return (
        <div role="heading" aria-level={3}>
            <button
                className={`${
                    !disabled
                        ? 'hover:bg-cyan-300 active:bg-cyan-400 cursor-pointer'
                        : 'cursor-not-allowed opacity-85'
                } bg-cyan-200 text-gray-800 rounded-md p-2 w-full flex justify-between gap-8 items-center text-balance text-left font-semibold`}
                onClick={!disabled ? handleToggleExpanded : undefined}
                id={headerId}
                role="button"
                aria-label={header}
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
    handleClosePanel: (e: React.KeyboardEvent<HTMLDivElement>) => void
}) => {
    const { expanded, panelId, headerId, children, handleClosePanel } = props

    return (
        expanded && (
            <div
                className="p-2 bg-red-400 rounded-md mt-1 text-balance"
                onKeyDown={handleClosePanel}
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

    return <span>{disabled ? '' : expanded ? '-' : '+'}</span>
}

export default Accordion
