import { createContext } from "react";

export const GameContext = createContext<{
  result: number;
  deductFunds: () => void;
  roll: () => void;
  selection: string;
  bid: (seleciton: string) => void;
  cash: number;
  bidAmt: number;
  changeBidAmt: (increasing: boolean) => void;
}>({
  result: 0,
  deductFunds: () => {},
  roll: () => {},
  selection: '',
  bid: () => {},
  cash: 0,
  bidAmt: 0,
  changeBidAmt: () => {},
});
