import { BrowserRouter } from 'react-router-dom'
import {} from '.'
import './App.css'
import RoutesApp from './routes'
import { GlobalStyle } from './styles/global'

function App() {
  return (
    <BrowserRouter>
      <RoutesApp />

      <GlobalStyle />
    </BrowserRouter>
  )
}

export default App
