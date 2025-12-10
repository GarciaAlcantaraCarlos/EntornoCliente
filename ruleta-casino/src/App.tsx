import './App.css'
import GameProvider from './GameProvider'
import Ruleta from './Ruleta'
import Teclado from './Teclado'
import Funds from './Funds'

function App() {

  return (
    <>
      <GameProvider>
        <div className='flex'>
          <Ruleta />
          <Funds />
        </div>
        <Teclado />
      </GameProvider>
    </>
  )
}

export default App
