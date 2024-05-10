import { ChakraProvider, Spinner, Stack, Text, useDisclosure, useToast } from '@chakra-ui/react'
import { useState } from 'react'
import InterviewToggleButton from '../components/InterviewToggleButton'
// import InterviewScreen from '../components/InterviewScreen'
import ToggleTheme from '../components/ToggleTheme'
// import InterviewScreenTrial from '../components/InterviewScreenTrial'
import axios from 'axios'
import ChooseBotPreference from '../components/ChooseBotPreference'
import InterviewCompletedScreen from '../components/InterviewCompletedScreen'
import InterviewScreenVideoBot from '../components/InterviewScreenVideoBot'
import { API_URL } from '../utils/constants'
// import MultipleChoiceButton from '../components/MultipleChoiceButton'

interface Props {
	smashUserId: string
}

const Interview = (props: Props) => {
	const { smashUserId } = props
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [showInterviewEndScreen, setShowInterviewEndScreen] = useState(false)
	const [botPreference, setBotPreference] = useState('male')
	const [showInterview, setShowInterview] = useState(false)
	const [showBotAvatar, setShowBotAvatar] = useState(false)
	const [loading, setLoading] = useState(false)
	const toast = useToast()
	const [key, setKey] = useState('')
	const skipAllQuestion = async () => {
		if (key) {
			const { data } = await axios.post(`${API_URL}/user/answer/skip/all`, {
				interview_key: key,
			})
			if (data.success) {
				console.log('interview skipped')
				// toast({
				// 	title: 'Interview Skipped',
				// 	status: 'success',
				// 	duration: 3000,
				// 	isClosable: true,
				// })
			} else {
				toast({
					title: 'Failed to skip interview',
					status: 'error',
					duration: 3000,
					isClosable: true,
					position: 'top',
				})
			}
		} else {
			toast({
				title: 'Interview key empty',
				status: 'error',
				duration: 3000,
				isClosable: true,
				position: 'top',
			})
		}
	}

	const toggleInterview = async () => {
		if (showInterviewEndScreen && showBotAvatar) {
			setShowInterviewEndScreen(false)
			setShowBotAvatar(false)
			return
		}
		if (!showInterview) {
			setLoading(true)
			const { data } = await axios.post(`${API_URL}/user/check`, {
				smash_user_id: smashUserId,
			})
			if (data.success) {
				if (data.isCompleted) {
					setShowInterviewEndScreen(true)
					setLoading(false)
					setShowBotAvatar(true)
					return
				}
				setBotPreference(data.data)
				setShowInterview(true)
				setShowBotAvatar(true)
			} else if (!data.success && data.error) {
				console.log(data.error)
			} else {
				onOpen()
			}
			setLoading(false)
		} else {
			skipAllQuestion()
			setKey('')
			setShowInterview(!showInterview)
			setShowBotAvatar(!showBotAvatar)
			setShowInterviewEndScreen(false)
		}
	}

	const handleOnClose = () => {
		setShowInterview(true)
		setShowBotAvatar(true)
		onClose()
	}

	return (
		<ChakraProvider>
			<Stack h={'100vh'}>
				<Stack h={'100vh'} justifyContent={'center'} alignItems={'center'}>
					{loading && <Spinner size={'xl'} />}
					{!loading && (
						<>
							<ChooseBotPreference
								onClose={handleOnClose}
								onOpen={onOpen}
								isOpen={isOpen}
								botPreference={botPreference}
								setBotPreference={setBotPreference}
							/>
							{showInterviewEndScreen && <InterviewCompletedScreen />}
							{!showInterview && !showInterviewEndScreen && (
								<Text fontSize={'1.3rem'}>Smash Dashboard</Text>
							)}
							<ToggleTheme />
							<InterviewToggleButton
								botPreference={botPreference}
								onClick={toggleInterview}
								showInterview={showBotAvatar}
							/>
							{showInterview && (
								<InterviewScreenVideoBot
									smashUserId={smashUserId}
									botPreference={botPreference}
									setKey={setKey}
									toggleInterview={toggleInterview}
								/>
							)}
						</>
					)}
				</Stack>
			</Stack>
		</ChakraProvider>
	)
}

export default Interview
