import './App.css'
import { BrowserRouter } from 'react-router'
import AppRouter from './router/appRouter'
import store from './app/store'
import { Provider } from 'react-redux'

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  )
}

export default App
