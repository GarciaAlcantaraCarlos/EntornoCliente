import { useState } from "react";
import { GameContext } from "./GameContext";

interface Provider { children: React.ReactNode }


const RED_NUMBERS = ['1', '3', '5', '7', '9', '12', '14', '16', '18', '19', '21', '23', '25', '27', '30', '32', '34', '36']
const BLACK_NUMBERS = ['2', '4', '6', '8', '10', '11', '13', '15', '17', '20', '22', '24', '26', '28', '29', '31', '33', '35']


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const roundTests: { [key: string]: (result: number, param: any) => number } = {
  num: (result: number, number: number) => {
    let bidMultiplier = 0;
    if (result == number) bidMultiplier = 36;
    return bidMultiplier;
  },

  row: (result: number, paramIndex: string) => {
    let bidMultiplier = 0;
    let index = parseInt(paramIndex);
    if (index === 3) index = 0;
    if (result%3 == index) bidMultiplier = 3;
    return bidMultiplier;
  },

  cols: (result: number, set: number) => {
    let bidMultiplier = 0;
    if (((set - 1) * 12 + 1) < result && result < (set * 12)) bidMultiplier = 3;
    return bidMultiplier;
  },
  even: (result: number, isEven: boolean | string) => {
    let bidMultiplier = 0;
    const isEvenBool = isEven === true || isEven === "true";
    if ((result % 2 === 0) === isEvenBool) bidMultiplier = 2;
    return bidMultiplier;
  },
  half: (result: number, half: number) => {
    let bidMultiplier = 0;
    if (((half - 1) * 18 + 1) < result && result < (half * 18)) bidMultiplier = 2;
    return bidMultiplier;
  },
  color: (result: number, red: boolean | string) => {
    let bidMultiplier = 0;
    const isRed = red === true || red === "true";
    if (RED_NUMBERS.includes(String(result)) && isRed || BLACK_NUMBERS.includes(String(result)) && !isRed) bidMultiplier = 2;
    return bidMultiplier;
  },
}


export default function GameProvider({ children }: Provider) {
  const [result, setResult] = useState(0);
  const [cash, setCash] = useState(500);
  const [bidAmt, setBidAmt] = useState(5);
  const [selection, setSelection] = useState('');
  
  const handleRound = (result : number) => {
    const selectionParams = selection.split(',')
    const bidMultiplier = roundTests[selectionParams[0]](result, selectionParams[1])
    setCash(prev => prev + bidAmt * bidMultiplier);
  }

  const roll = () => {
    const rollResult = Math.floor(Math.random() * 37);
    setResult(rollResult);
    handleRound(rollResult);
  };

  const bid = (bidKey : string) => {
    setSelection(bidKey);
  }

  const changeBidAmt = (increasing : boolean) => {
    if (increasing) setBidAmt(Math.min(bidAmt + 5, cash))
    else setBidAmt(Math.min(Math.max(bidAmt - 5, 5), cash))
  }

  const deductFunds = () => {
    setCash(prev => prev - bidAmt);
  }

  return (
    <GameContext value={{ result, deductFunds, roll, selection, bid, cash, bidAmt, changeBidAmt}}>
      {children}
    </GameContext>
  );
}