import { Button, Stack, Text, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { FiCheckCircle } from 'react-icons/fi'
import { API_URL } from '../utils/constants'

interface MultipleChoiceButtonProps {
	options: string[]
	interviewKey: string
	questionId: number
	goToNextQuestion: () => void
}

const MultipleChoiceButton: React.FC<MultipleChoiceButtonProps> = ({
	options,
	interviewKey,
	questionId,
	goToNextQuestion,
}) => {
	const [selectedOption, setSelectedOption] = useState('')
	const [loading, setLoading] = useState(false)
	const toast = useToast()
	const handleButtonClick = (value: React.SetStateAction<string>) => {
		if (selectedOption === value) {
			setSelectedOption('')
		} else {
			setSelectedOption(value)
		}
	}

	const submitAnswer = async () => {
		setLoading(true)
		const { data } = await axios.post(`${API_URL}/user/answer/save/multiple-choice`, {
			interview_key: interviewKey,
			question_id: questionId,
			answer: selectedOption,
		})
		console.log(data)
		setLoading(false)
		if (data.success) {
			goToNextQuestion()
			toast({
				title: `Question ${questionId + 1} submitted`,
				// description: `You have skipped the question: ${questions[currentQuestionIndex].question_text}`,
				status: 'success',
				duration: 2000,
				position: 'top',
			})
		} else {
			toast({
				title: data.message,
				// description: `You have skipped the question: ${questions[currentQuestionIndex].question_text}`,
				status: 'error',
				duration: 2000,
				position: 'top',
			})
		}
	}

	return (
		<Stack justifyContent={'center'} alignItems={'center'}>
			<Text fontSize={'1.2rem'}>Select an option</Text>
			<Stack direction="row" spacing={4}>
				{options.map((option) => (
					<Button
						key={option}
						colorScheme={selectedOption === option ? 'facebook' : 'gray'}
						onClick={() => handleButtonClick(option)}
					>
						{option}
					</Button>
				))}
			</Stack>

			<Button
				isLoading={loading}
				leftIcon={<FiCheckCircle />}
				colorScheme="green"
				isDisabled={selectedOption === ''}
				onClick={submitAnswer}
			>
				Submit
			</Button>

			{/* <p>Selected option: {selectedOption}</p> */}
		</Stack>
	)
}

export default MultipleChoiceButton
