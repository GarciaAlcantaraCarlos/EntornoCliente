import { useEffect, useReducer } from 'react'
import './App.css'

interface GameState {
  applications: number;
  clickMultiplier: number;
  passiveClicks: number;
}

type GameAction = {
  trigger: 'click' | 'tick' | 'buy_passive';
}

const setup = {
  fps: 10,
}

function App() {

  function gameReducer(state: GameState, action: GameAction) {
    if(action.trigger === 'click') return { 
      ...state,
      applications: state.applications + 1,
    }
    if(action.trigger === 'buy_passive') return {
      ...state,
      passiveClicks: state.passiveClicks + 0.1,
    }
    if(action.trigger === 'tick') return {
      ...state,
      applications: state.applications + (state.passiveClicks / setup.fps),
    }
    throw Error ('Unknown action.')
  }

  const initialGameState = {
    applications: 0,
    clickMultiplier: 1,
    passiveClicks: 0,
  };

  const [state, dispatch] = useReducer(gameReducer, initialGameState)

  useEffect(() => {
    const ticker = setInterval(() => {
      dispatch({ trigger: 'tick' })
    }, (1000 / setup.fps))

    return () => clearInterval(ticker)
  }, [])

  return (
    <>
      <h2>{state.applications.toFixed(0)} job applications</h2>
      <h4>{state.passiveClicks.toFixed(1)} applications per second</h4>
      <button onClick={() => dispatch({ trigger: 'click' })}>Send job application</button>
      <button onClick={() => dispatch({ trigger: 'buy_passive' })}>Buy a passive click</button>
    </>
  )
}

export default App
