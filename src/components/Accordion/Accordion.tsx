import { uniqueID } from '@/helper/uniqueID'
import { useToggle } from '@/hooks/useToggle'
import { StringNumberJSX } from '@/types/StringNumberJSX'
import React, { FC, useEffect, useRef, useState } from 'react'

// TODO: build logic that lets a screen reader know which text to read aloud
// if the child element is a ReactNode

type AccordionProps = {
    children: StringNumberJSX
    header: string
    disabled?: boolean
    startExpanded?: boolean
}

const Accordion: FC<AccordionProps> = ({
    children,
    header,
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

    // stores the header element of the currently selected accordion
    const headerRef = useRef<HTMLButtonElement>(null)

    // stores the header element of the currently selected accordion
    const panelRef = useRef<HTMLDivElement>(null)

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

    // checks if the panel is expanded and focusses the panel if so
    useEffect(() => {
        if (expanded && panelRef.current && !disabled) {
            panelRef.current.focus()
        }
    }, [expanded, panelRef.current])

    // focusses the header element of the currently selected accordion
    const focusCurrentHeader = () => {
        headerRef.current?.focus()
    }

    // closes the accordion panel and sets focus to the currently selected accordion header
    const handleClosePanel = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
            e.preventDefault()
            focusCurrentHeader()
            handleToggleExpanded()
        }
    }

    return (
        <div className="bg-slate-200 p-1 m-1 max-w-72 min-w-36 rounded-lg">
            <AccordionHeader
                disabled={disabled}
                expanded={expanded}
                handleToggleExpanded={handleToggleExpanded}
                header={header}
                headerId={headerId}
                headerRef={headerRef}
                panelId={panelId}
            />
            <AccordionPanel
                children={children}
                expanded={expanded}
                handleClosePanel={handleClosePanel}
                headerId={headerId}
                panelId={panelId}
                panelRef={panelRef}
            />
        </div>
    )
}

const AccordionHeader = (props: {
    disabled: boolean
    expanded: boolean
    handleToggleExpanded: () => void
    header: string
    headerId: string
    headerRef: React.RefObject<HTMLButtonElement>
    panelId: string
}) => {
    const {
        disabled,
        expanded,
        handleToggleExpanded,
        header,
        headerId,
        headerRef,
        panelId,
    } = props

    return (
        <div role="heading" aria-level={3}>
            <button
                className={`${
                    !disabled
                        ? 'hover:bg-cyan-300 active:bg-cyan-400 cursor-pointer'
                        : 'cursor-not-allowed opacity-85'
                } bg-cyan-200 text-gray-800 rounded-md p-2 w-full flex justify-between gap-8 items-center text-balance text-left font-semibold`}
                id={headerId}
                onClick={!disabled ? handleToggleExpanded : undefined}
                ref={headerRef}
                aria-label={header}
                aria-expanded={expanded}
                aria-controls={panelId}
                aria-pressed={!disabled ? expanded : undefined}
                aria-disabled={disabled}
                role="button"
            >
                {header}
                <AccordionIcon disabled={disabled} expanded={expanded} />
            </button>
        </div>
    )
}

const AccordionPanel = (props: {
    children: StringNumberJSX
    expanded: boolean
    handleClosePanel: (e: React.KeyboardEvent<HTMLDivElement>) => void
    headerId: string
    panelId: string
    panelRef: React.RefObject<HTMLDivElement>
}) => {
    const {
        children,
        expanded,
        handleClosePanel,
        headerId,
        panelId,
        panelRef,
    } = props

    return (
        expanded && (
            <div
                className="p-2 bg-red-400 rounded-md mt-1 text-balance"
                id={panelId}
                onKeyDown={handleClosePanel}
                ref={panelRef}
                tabIndex={0}
                // not necessary, will be replaced by aria-label probably
                // aria-label contains the panel content if it is a string,
                // the alt attribute if it is an image only
                // or any other kind of text if it is a ReactNode
                aria-labelledby={headerId}
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
