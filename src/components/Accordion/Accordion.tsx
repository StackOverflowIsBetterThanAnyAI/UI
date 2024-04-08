import { uniqueID } from '@/helper/uniqueID'
import { useToggle } from '@/hooks/useToggle'
import { StringNumberJSX } from '@/types/StringNumberJSX'
import React, { FC, useEffect, useRef, useState } from 'react'

const COLOR_VARIANTS = {
    primary: 'bg-cyan-300 hover:bg-cyan-400 active:bg-cyan-500',
    primary_disabled: 'bg-cyan-300',
    secondary: 'bg-red-400',
    text: 'text-gray-800',
    background: 'bg-slate-200',
}

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

    const setId = () => {
        setHeaderId(uniqueID())
        setPanelId(uniqueID())
    }

    const resetId = () => {
        setHeaderId('')
        setPanelId('')
    }

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

    const focusCurrentHeader = () => {
        headerRef.current?.focus()
    }

    const handleClosePanel = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
            e.preventDefault()
            focusCurrentHeader()
            handleToggleExpanded()
        }
    }

    return (
        <div
            className={`${COLOR_VARIANTS.background} p-1 m-1 max-w-72 min-w-36 rounded-lg`}
        >
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
                        ? `${COLOR_VARIANTS.primary} cursor-pointer`
                        : `${COLOR_VARIANTS.primary_disabled} cursor-not-allowed opacity-85`
                } ${
                    COLOR_VARIANTS.text
                } rounded-md p-2 w-full flex justify-between gap-8 items-center text-balance text-left font-semibold`}
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
                className={`p-2 ${COLOR_VARIANTS.secondary} rounded-md mt-1 text-balance`}
                id={panelId}
                onKeyDown={handleClosePanel}
                ref={panelRef}
                tabIndex={0}
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
