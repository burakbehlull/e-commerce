"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { ColorModeProvider } from "./color-mode"

export default function Provider(props) {

    const theme = "light"

    return (
        <ChakraProvider value={defaultSystem}>
            <ColorModeProvider 
                forcedTheme={theme}
                {...props} 
            />
        </ChakraProvider>
    )
}