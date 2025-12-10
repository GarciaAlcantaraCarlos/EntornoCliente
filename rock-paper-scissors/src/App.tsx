import { useState } from 'react'
import DisplayBox from './DisplayBox'
import './App.css'

function App() {
  const actions = ['🪨', '📄', '✂️'];
  const [points, setPoints] = useState<{ user: number; cpu: number }>({'user': 0, 'cpu': 0});
  const [currentAction, setCurrentAction] = useState<{ user: string; cpu: string }>({'user': '', 'cpu': ''});

  function resetScore() : void {
    setPoints({'user': 0, 'cpu': 0});
  }

  function selectAction ( action : string ) : void {
    if (points.user < 3 && points.cpu < 3) {
      const cpuAction = getCPUAction();
      const newActions = {'user':action, 'cpu':cpuAction};
      setCurrentAction(newActions);
      processScore(action, cpuAction);
    }
  }

  function getCPUAction() : string {
    return actions[Math.floor(Math.random()*actions.length)];
  }

  function processScore(user : string, cpu : string) : void {
    const newPoints = points;
    const result = getWinner(user, cpu);
    if (result === 'win') newPoints.user++;
    if (result === 'lose') newPoints.cpu++;
    setPoints(newPoints)
  }

  function getWinner(user : string, cpu : string) : string {
    let result = '';

    if (user === cpu) result = 'tie';
    else if (user === '🪨' && cpu === '✂️' ||
             user === '✂️' && cpu === '📄' ||
             user === '📄' && cpu === '🪨') result = 'win';
    else result = 'lose';
    
    return result;
  }

  return (
    <>
      <h1>{points.user} - {points.cpu}</h1>
      <div className='gameContainer'>
        <DisplayBox owner="User" currentItem={currentAction.user} />
        <DisplayBox owner="CPU" currentItem={currentAction.cpu} />
        <div className='userActions'>
          <button onClick={() => selectAction('🪨')}>🪨</button>
          <button onClick={() => selectAction('📄')}>📄</button>
          <button onClick={() => selectAction('✂️')}>✂️</button>
        </div>
        <div>
          <button onClick={() => resetScore()}>Reset score</button>
        </div>
      </div>
    </>
  )
}

export default App
