import { Image, VStack } from '@chakra-ui/react'

const InterviewCompletedScreen = () => {
	const imgUrl = new URL('./images/interview_end.png', import.meta.url).href

	return (
		<>
			<VStack spacing={2} p={4} justifyContent={'center'} alignItems={'center'} h={'100vh'}>
				<Image
					src={imgUrl}
					h={'90vh'}
					style={{
						borderRadius: '30px',
						boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)',
					}}
				/>
			</VStack>
		</>
	)
}

export default InterviewCompletedScreen
