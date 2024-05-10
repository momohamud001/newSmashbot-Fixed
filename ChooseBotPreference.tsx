import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/react'

import { FormControl, FormLabel, HStack, Radio, RadioGroup } from '@chakra-ui/react'

interface ChooseBotPreferenceProps {
	isOpen: boolean
	onOpen: () => void
	onClose: () => void
	botPreference: string
	setBotPreference: (botPreference: string) => void
}

const ChooseBotPreference = ({
	isOpen,
	onClose,
	botPreference,
	setBotPreference,
}: ChooseBotPreferenceProps) => {
	return (
		<>
			<Modal isOpen={isOpen} onClose={() => {}} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Bot Preference</ModalHeader>
					{/* <ModalCloseButton /> */}
					<ModalBody>
						<FormControl as="fieldset">
							<FormLabel as="legend">Choose your bot preference</FormLabel>
							<RadioGroup
								defaultValue={botPreference}
								onChange={(newBotPreference) => {
									setBotPreference(newBotPreference)
								}}
							>
								<HStack spacing={2}>
									<Radio value="male">Male</Radio>
									<Radio value="female">Female</Radio>
								</HStack>
							</RadioGroup>
						</FormControl>
					</ModalBody>
					<ModalFooter>
						<Button
							colorScheme="facebook"
							mr={3}
							onClick={() => {
								console.log('botPreference', botPreference)
								onClose()
							}}
						>
							Done
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

export default ChooseBotPreference
