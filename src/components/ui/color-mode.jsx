'use client'

import { ClientOnly, IconButton, Skeleton } from '@chakra-ui/react'
import { ThemeProvider, useTheme } from 'next-themes'
import { LuMoon, LuSun } from 'react-icons/lu'
import * as React from 'react'

export function ColorModeProvider(props) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange {...props} />
  )
}

export function useColorMode() {
  const { resolvedTheme, setTheme, forcedTheme } = useTheme()
  const colorMode = forcedTheme || resolvedTheme

  const toggleColorMode = () => {
    setTheme(colorMode === 'dark' ? 'light' : 'dark')
  }

  return {
    colorMode,
    toggleColorMode,
  }
}

export function ColorModeIcon() {
  const { colorMode } = useColorMode()

  const iconStyle = {
    width: "32px",
    height: "32px",
  }

  return colorMode === "dark"
    ? <LuMoon style={iconStyle} />
    : <LuSun style={iconStyle} />
}

export const ColorModeButton = React.forwardRef(function ColorModeButton(
  props,
  ref,
) {
  const { toggleColorMode } = useColorMode()

  return (
    <ClientOnly fallback={<Skeleton boxSize="9" />}>
<IconButton
  onClick={toggleColorMode}
  variant="ghost"
  aria-label="Toggle color mode"
  boxSize="42px"
>
  <ColorModeIcon />
</IconButton>
    </ClientOnly>
  )
})
