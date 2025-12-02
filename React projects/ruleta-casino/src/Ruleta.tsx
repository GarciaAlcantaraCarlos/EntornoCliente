import { useContext, useState } from "react";
import { GameContext } from "./GameContext";
import './Ruleta.css'

const ANIMATION_DURATION = 4000;
const RED_NUMBERS = ['1', '3', '5', '7', '9', '12', '14', '16', '18', '19', '21', '23', '25', '27', '30', '32', '34', '36', 'rojo']
const BLACK_NUMBERS = ['2', '4', '6', '8', '10', '11', '13', '15', '17', '20', '22', '24', '26', '28', '29', '31', '33', '35', 'negro']

export default function Test() {
  const { result, deductFunds, roll, cash, bidAmt } = useContext(GameContext);
  const [buttonClass, setButtonClass] = useState('');
  const [disabledState, setDisabledState] = useState(false);

  let resultColor = 'green'
  if (RED_NUMBERS.includes(String(result))) resultColor = 'red'
  else if (BLACK_NUMBERS.includes(String(result))) resultColor = 'black'
 
  const rollRoulette = () => {
    if (cash < bidAmt) return;
    
    setButtonClass('animating');
    setDisabledState(true);
    deductFunds();

    setTimeout(() => {
      setButtonClass('');
      setDisabledState(false)
      roll();
    }, ANIMATION_DURATION);
  };

  return (
    <button
      id="roulette"
      onClick={rollRoulette}
      className={buttonClass}
      disabled={disabledState}
    >
      <img
        src="/images/roulette.png"
        alt="Ruleta"
      />
      <span className={resultColor}>{result}</span>
    </button>
  );
}
