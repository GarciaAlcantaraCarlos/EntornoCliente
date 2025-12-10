import { useContext } from "react";
import "./Tecla.css";
import { GameContext } from "./GameContext";

interface ReceivedProps {
  textContent: string;
  bidKey: string;
}

const RED_NUMBERS = ['1', '3', '5', '7', '9', '12', '14', '16', '18', '19', '21', '23', '25', '27', '30', '32', '34', '36', 'rojo']
const BLACK_NUMBERS = ['2', '4', '6', '8', '10', '11', '13', '15', '17', '20', '22', '24', '26', '28', '29', '31', '33', '35', 'negro']

export default function Tecla({ textContent, bidKey }: ReceivedProps) {
  const { selection, bid } = useContext(GameContext);
  let color = ' green';
  if (RED_NUMBERS.includes(textContent)) color = ' red'
  else if (BLACK_NUMBERS.includes(textContent)) color = ' black'
  if (textContent == 'rojo' || textContent == 'negro') color += ' color-bid'

  return (
    <button
      className={"bid-key" + ((selection == bidKey) ? " selected" : "") + color}
      onClick={() => bid(bidKey)}
    >
      {textContent}
    </button>
  );
}
