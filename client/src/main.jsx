import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@ui'

import { Toaster } from 'react-hot-toast'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
	<BrowserRouter>
		<ChakraProvider>
			<App />
			<Toaster
				position="top-center"
				reverseOrder={false}
			/>
		</ChakraProvider>
	</BrowserRouter>
  </StrictMode>,
)
