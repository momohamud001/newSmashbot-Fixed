import { Button, useColorMode, Tooltip } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'
const ToggleTheme = () => {
	const { colorMode, toggleColorMode } = useColorMode()
	return (
		<Tooltip
			hasArrow
			placement="left"
			label={colorMode === 'light' ? 'Toggle Dark Mode' : 'Toggle Light Mode'}
		>
			<Button
				onClick={toggleColorMode}
				width={'fit-content'}
				position={'absolute'}
				top={'20px'}
				right={'20px'}
				zIndex={20}
			>
				{colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
			</Button>
		</Tooltip>
	)
}

export default ToggleTheme
