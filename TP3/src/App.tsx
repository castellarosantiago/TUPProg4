import './App.css'
import Menu from './components/menu'
import Orden from './components/order'
import { OrderProvider } from './context/ordenContext'

function App() {


  return (
    <>
      <OrderProvider>
        <Menu />
        <Orden />
      </OrderProvider>
    </>
  )
}

export default App
