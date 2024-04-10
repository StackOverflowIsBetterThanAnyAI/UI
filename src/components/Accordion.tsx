import { uniqueID } from '@/helper/uniqueID'
import { useToggle } from '@/hooks/useToggle'
import { StringNumberJSX } from '@/types/types'
import React, { FC, useEffect, useRef, useState } from 'react'

const COLOR_VARIANTS = {
    primary:
        'bg-cyan-400 hover:bg-cyan-500 active:bg-cyan-600 focus:outline-blue-600 focus:outline active:ring-2 ring-blue-200',
    primary_disabled: 'bg-cyan-300 focus:outline-zinc-700 focus:outline',
    primary_text: 'text-zinc-900',
    secondary: 'bg-red-1000 focus:outline-red-600 focus:outline',
    secondary_disabled: 'bg-red-1000 focus:outline-zinc-700 focus:outline',
    secondary_text: 'text-slate-50',
    dark: 'bg-stone-700 hover:bg-stone-800 active:bg-stone-900 focus:outline-stone-900 focus:outline active:ring-2 ring-stone-100',
    dark_disabled: 'bg-stone-500 focus:outline-stone-300 focus:outline',
    dark_text: 'text-stone-100',
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

    const handleOpenPanel = () => {
        handleToggleExpanded()
    }

    const handleClosePanel = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
            e.preventDefault()
            focusCurrentHeader()
            handleToggleExpanded()
        }
        if (e.key === ' ' && disabled) {
            //disables scrolling
            e.preventDefault()
        }
    }

    return (
        <div
            className={`${COLOR_VARIANTS.background} p-1.5 m-1 max-w-72 min-w-36 rounded-lg`}
        >
            <AccordionHeader
                disabled={disabled}
                expanded={expanded}
                handleOpenPanel={handleOpenPanel}
                header={header}
                headerId={headerId}
                headerRef={headerRef}
                panelId={panelId}
            />
            <AccordionPanel
                children={children}
                disabled={disabled}
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
    handleOpenPanel: () => void
    header: string
    headerId: string
    headerRef: React.RefObject<HTMLButtonElement>
    panelId: string
}) => {
    const {
        disabled,
        expanded,
        handleOpenPanel,
        header,
        headerId,
        headerRef,
        panelId,
    } = props

    const headerClassName = `${
        !disabled
            ? `${COLOR_VARIANTS.primary} cursor-pointer`
            : `${COLOR_VARIANTS.primary_disabled} cursor-not-allowed opacity-85`
    } ${
        COLOR_VARIANTS.primary_text
    } rounded-md p-2 w-full flex justify-between gap-8 items-center text-balance text-left font-semibold outline-offset-2 outline-2 text-lg`

    return (
        <div role="heading" aria-level={3}>
            <button
                className={headerClassName}
                id={headerId}
                onClick={!disabled ? handleOpenPanel : undefined}
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
    disabled: boolean
    expanded: boolean
    handleClosePanel: (e: React.KeyboardEvent<HTMLDivElement>) => void
    headerId: string
    panelId: string
    panelRef: React.RefObject<HTMLDivElement>
}) => {
    const {
        children,
        disabled,
        expanded,
        handleClosePanel,
        headerId,
        panelId,
        panelRef,
    } = props

    const panelClassName = `p-2 ${
        disabled ? COLOR_VARIANTS.secondary_disabled : COLOR_VARIANTS.secondary
    } ${
        COLOR_VARIANTS.secondary_text
    } outline-offset-2 outline-2 rounded-md mt-1.5 text-balance cursor-text text-base`

    return (
        expanded && (
            <div
                className={panelClassName}
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
