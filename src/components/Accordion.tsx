import { uniqueID } from '@/helper/uniqueID'
import { useToggle } from '@/hooks/useToggle'
import { StringNumberJSX } from '@/types/types'
import React, { FC, useEffect, useRef, useState } from 'react'

const COLOR_VARIANTS = {
    primary:
        'bg-cyan-450 hover:bg-cyan-500 active:bg-cyan-600 focus:outline-blue-600 focus:outline active:ring-2 ring-blue-200',
    primary_disabled: 'bg-cyan-250 focus:outline-stone-500 focus:outline',
    primary_text: 'text-stone-900',

    secondary: 'bg-red-1000 focus:outline-red-500 focus:outline',
    secondary_disabled: 'bg-red-1000 focus:outline-stone-500 focus:outline',
    secondary_text: 'text-stone-50',

    dark: 'bg-stone-700 hover:bg-stone-800 active:bg-stone-900 focus:outline-stone-900 focus:outline active:ring-2 ring-stone-200',
    dark_disabled: 'bg-stone-450 focus:outline-stone-500 focus:outline',
    dark_text: 'text-stone-100',

    dark_corresponding: 'bg-stone-350 focus:outline-stone-900 focus:outline',
    dark_corresponding_disabled:
        'bg-stone-350 focus:outline-stone-500 focus:outline',
    dark_corresponding_text: 'text-stone-800',

    background: 'bg-slate-200',
}

type AccordionProps = {
    children: StringNumberJSX
    header: string
    dark?: boolean
    disabled?: boolean
    id?: string
    startExpanded?: boolean
}

type ThemeProps = {
    primary: string
    primary_disabled: string
    primary_text: string
    secondary: string
    secondary_disabled: string
    secondary_text: string
}

const Accordion: FC<AccordionProps> = ({
    children,
    dark = false,
    header,
    id,
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

    const theme: ThemeProps = dark
        ? {
              primary: COLOR_VARIANTS.dark,
              primary_disabled: COLOR_VARIANTS.dark_disabled,
              primary_text: COLOR_VARIANTS.dark_text,
              secondary: COLOR_VARIANTS.dark_corresponding,
              secondary_disabled: COLOR_VARIANTS.dark_corresponding_disabled,
              secondary_text: COLOR_VARIANTS.dark_corresponding_text,
          }
        : {
              primary: COLOR_VARIANTS.primary,
              primary_disabled: COLOR_VARIANTS.primary_disabled,
              primary_text: COLOR_VARIANTS.primary_text,
              secondary: COLOR_VARIANTS.secondary,
              secondary_disabled: COLOR_VARIANTS.secondary_disabled,
              secondary_text: COLOR_VARIANTS.secondary_text,
          }

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
            className={`${COLOR_VARIANTS.background} p-1.5 m-1 max-w-72 min-w-36 rounded-lg w-full`}
        >
            <AccordionHeader
                disabled={disabled}
                expanded={expanded}
                handleOpenPanel={handleOpenPanel}
                header={header}
                headerId={headerId}
                headerRef={headerRef}
                id={id}
                panelId={panelId}
                theme={theme}
            />
            <AccordionPanel
                children={children}
                disabled={disabled}
                expanded={expanded}
                handleClosePanel={handleClosePanel}
                headerId={headerId}
                panelId={panelId}
                panelRef={panelRef}
                theme={theme}
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
    id: string | undefined
    panelId: string
    theme: ThemeProps
}) => {
    const {
        disabled,
        expanded,
        handleOpenPanel,
        header,
        headerId,
        headerRef,
        id,
        panelId,
        theme,
    } = props

    const headerClassName = `${
        !disabled
            ? `${theme.primary} cursor-pointer`
            : `${theme.primary_disabled} cursor-not-allowed opacity-85`
    } 
    ${
        theme.primary_text
    } rounded-md p-2 w-full flex justify-between gap-8 items-center text-balance text-left font-semibold outline-offset-2 outline-2 lg:text-xl sm:text-lg text-base`

    const arialabel = `${header} ${disabled ? '.disabled' : ''}`

    return (
        <div role="heading" aria-level={3} id={id}>
            <button
                className={headerClassName}
                id={headerId}
                onClick={!disabled ? handleOpenPanel : undefined}
                ref={headerRef}
                aria-label={arialabel}
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
    theme: ThemeProps
}) => {
    const {
        children,
        disabled,
        expanded,
        handleClosePanel,
        headerId,
        panelId,
        panelRef,
        theme,
    } = props

    const panelClassName = `p-2 ${
        disabled ? theme.secondary_disabled : theme.secondary
    } ${
        theme.secondary_text
    } outline-offset-2 outline-2 rounded-b-md mt-1.5 text-balance cursor-text lg:text-lg sm:text-base text-sm`

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
