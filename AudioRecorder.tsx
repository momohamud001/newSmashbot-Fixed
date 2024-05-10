/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'
// import MicIcon from '@mui/icons-material/Mic'
import { Button, Stack, Text, Tooltip, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useAudioRecorder } from 'react-audio-voice-recorder'
import { FiCheck, FiMic } from 'react-icons/fi'
import { v4 as uuidv4 } from 'uuid'
import { API_URL } from '../utils/constants'

interface AudioRecorderProps {
	interviewKey: string
	handleAnswer: (answer: string, key: string) => void
	updateIsListening: (isListening: boolean) => void
	questionId: number
	goToNextQuestion: () => void
	setPlaying: (isPlaying: boolean) => void
	setPlaysinline: (playsinline: boolean) => void
}
export const AudioRecorder = (props: AudioRecorderProps) => {
	const {
		interviewKey,
		updateIsListening,
		questionId,
		goToNextQuestion,
		setPlaying,
		setPlaysinline,
	} = props
	const toast = useToast()
	const [recordingStatus, setRecordingStatus] = useState('inactive')
	const [showSubmitButton, setShowSubmitButton] = useState(false)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setRecordingStatus('inactive')
	}, [questionId])

	const { startRecording, stopRecording, recordingBlob, isRecording } = useAudioRecorder()

	// useEffect(() => {
	// 	if (!recordingBlob) return
	// 	uploadRecording(recordingBlob)
	// }, [recordingBlob])

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const uploadRecording = async (recordingBlob: BlobPart | any) => {
		setLoading(true)
		const myUuid = uuidv4()
		const key = `${myUuid}_${interviewKey}.mp3`
		const file = new File([recordingBlob], key, { type: 'audio/mpeg' })
		const formData = new FormData()
		formData.append('question_id', questionId.toString())
		formData.append('interview_key', interviewKey)
		formData.append('recording', file)
		const { data } = await axios.post(`${API_URL}/user/answer/save`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
		setLoading(false)
		if (data.success) {
			toast({
				title: data.message,
				status: 'success',
				duration: 3000,
				position: 'top',
			})
			setShowSubmitButton(false)
			goToNextQuestion()
		} else {
			toast({
				title: data.message,
				status: 'error',
				duration: 3000,
				position: 'top',
			})
		}
	}

	const start = async () => {
		try {
			updateIsListening(true)
			startRecording()
			setRecordingStatus('recording')
			setShowSubmitButton(false)
			setPlaying(true)
			setPlaysinline(true)
		} catch (error) {
			console.error('Error accessing audio:', error)
		}
	}

	const stop = async () => {
		toast({
			title:
				'If you are happy with your answer, click the checkmark to submit. Otherwise, click the microphone to re-record.',
			status: 'info',
			duration: 3000,
			position: 'top',
		})
		stopRecording()
		setShowSubmitButton(true)
		setPlaying(false)
		setPlaysinline(false)
		setRecordingStatus('inactive')
	}

	return (
		<Stack direction={'row'}>
			{recordingStatus !== 'recording' && !isRecording ? (
				<Tooltip
					label={showSubmitButton ? 'Re-record your answer' : 'Record your answer'}
					placement="top"
					hasArrow
				>
					<div>
						<Button
							onClick={start}
							style={{
								borderRadius: '50%',
								border: '1px',
								width: '75px',
								height: '75px',
								// color: enabledRecording ? '#ffffff' : 'gray',
								// borderColor: '#ffffff',
								boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)',
							}}
							isLoading={loading}
						>
							<Text fontSize="1.2rem">
								<FiMic
									style={{
										width: '2em',
										height: '2em',
										fontSize: 'large',
									}}
								/>
							</Text>
						</Button>
					</div>
				</Tooltip>
			) : null}

			{recordingStatus === 'recording' && isRecording ? (
				<Tooltip label="Stop Recording" placement="top" hasArrow>
					<Button
						onClick={stop}
						style={{
							borderRadius: '50%',
							border: '1px',
							width: '75px',
							height: '75px',
							backgroundColor: 'red',
							// color: enabledRecording ? '#ffffff' : 'gray',
							// borderColor: '#ffffff',
							boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)',
						}}
						isLoading={loading}
					>
						<Text fontSize={'1.2rem'}>
							<FiMic
								style={{
									width: '2em',
									height: '2em',
									fontSize: 'large',
								}}
							/>
						</Text>
					</Button>
				</Tooltip>
			) : null}
			{showSubmitButton ? (
				<Tooltip label="Submit your answer" placement="top" hasArrow>
					<Button
						onClick={() => uploadRecording(recordingBlob)}
						style={{
							borderRadius: '50%',
							border: '1px',
							width: '75px',
							height: '75px',
							boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)',

							// backgroundColor: 'green',
							// color: enabledRecording ? '#ffffff' : 'gray',
							// borderColor: '#ffffff',
						}}
						isLoading={loading}
					>
						<Text fontSize={'1.2rem'}>
							<FiCheck
								style={{
									width: '2em',
									height: '2em',
									fontSize: 'large',
								}}
							/>
						</Text>
					</Button>
				</Tooltip>
			) : null}
		</Stack>
	)
}
