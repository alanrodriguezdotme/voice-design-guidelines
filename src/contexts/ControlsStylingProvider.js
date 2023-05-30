import React, { createContext, useState } from 'react'

export const ControlsStylingContext = createContext()

const ControlsStylingContextProvider = (props) => {
    const [primaryButtonStyle, setPrimaryButtonStyle] = useState(
        {
            root: {
                fontFamily: "Segoe UI Semibold, system-ui",
                height: 48,
                borderRadius: 28,
            },
            label: {
                color: "#000",
                fontSize: "16px"
            }
        })

    const [secondaryButtonStyle, setSecondaryButtonStyle] = useState(
        {
            root: {
                fontFamily: "SegoeUI, system-ui",
                height: 48,
                borderRadius: 28,
            },
            label: {
                fontWeight: "normal"
            }
        })

    const [actionButtonStyle, setActionButtonStyle] = useState(
        {
            root: {
                fontFamily: "SegoeUI, system-ui",
                height: 48,
                borderRadius: 28,
            },
            label: {
                fontWeight: "normal",
            }
        })

    const [textfieldStyle, setTextfieldStyle] = useState(
        {
            fieldGroup: {
                fontFamily: "SegoeUI, system-ui",
                height: 48,
                border: 0,
                borderRadius: 10,
                boxShadow: "0 2px 22px 4px rgba(0,0,0,0.05)",
            },
            field: {
                fontFamily: "SegoeUI, system-ui",
            }
        })

    const [dropdownStyle, setDropdownStyle] = useState(
        {
            dropdown: {
                fontFamily: "SegoeUI, system-ui"
            },
            title: {
                height: 48,
                border: 0,
                borderRadius: 12,
                boxShadow: "0 2px 22px 4px rgba(0, 0, 0, 0.05)",
                padding: "8px 0 0 12px",
            },
            caretDownWrapper: {
                margin: "8px 8px 0 0"
            },
            callout: {
                fontFamily: "SegoeUI, system-ui",
            }
        })

        const [sideNavStyle, setSideNavStyle] = useState(
            {
                root: {
                    width: 260,
                    fontFamily: "SegoeUI, system-ui"
                },
                link: {
                    fontFamily: "SegoeUI, system-ui"
                },
                chevronButton: {
                    fontFamily: "SegoeUI, system-ui"
                }
            })

    return (
        <ControlsStylingContext.Provider value={
            {
                primaryButtonStyle,
                setPrimaryButtonStyle,
                secondaryButtonStyle,
                setSecondaryButtonStyle,
                actionButtonStyle,
                setActionButtonStyle,
                textfieldStyle,
                setTextfieldStyle,
                dropdownStyle,
                setDropdownStyle,
                sideNavStyle, 
                setSideNavStyle
            }
        }>
            {props.children}
        </ControlsStylingContext.Provider>
    );
}

export default ControlsStylingContextProvider;