import { ChakraProvider } from '@chakra-ui/react'
import ReactDOM from 'react-dom/client'
import { v4 as uuidv4 } from 'uuid'
import Interview from './pages/Interview.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ChakraProvider>
        {/* <Interview name="test-with-fixes" smashUserId={'0fb20906-cb60-440b-8bce-03019cacc7f1'} /> */}
        <Interview smashUserId={uuidv4()} />
    </ChakraProvider>,
)