import { useContext } from 'react'
import './Funds.css'
import { GameContext } from './GameContext';

export default function Funds () {
  const { bidAmt, cash, changeBidAmt } = useContext(GameContext);
  return (
    <div id="funds">
      <p>Funds:</p>
      <p className='special'>{cash}</p>
      <div className="spacer"></div>
      <p>Bid:</p>
      <div>
        <button onClick={() => changeBidAmt(false)}>-</button>
        <p className='special'>{bidAmt}</p>
        <button onClick={() => changeBidAmt(true)}>+</button>
      </div>
    </div>
  )
}