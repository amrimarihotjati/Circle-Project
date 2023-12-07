import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ChakraProvider, extendBaseTheme } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import RootReducer from './store/rootReducer.ts'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query'


const darkTheme = extendBaseTheme({
  styles: {
    global: {
      body: {
        bg: 'darkBackground',
        color: 'white'
      }
    }
  },
  colors: {
    darkBackground: '#1d1d1d',
  }
});
const client = new QueryClient();
const store = configureStore({
  reducer: RootReducer
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={client}>
    <ChakraProvider theme={darkTheme}>
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    </ChakraProvider>
  </QueryClientProvider>
)
