import { useState } from 'react'
import Keycap from './Keycap'
import LetterBox from './LetterBox'
import './App.css'

type Key = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' |
           'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z';

type KeyStates = Record<Key, boolean>

function App() {

  const words = [
    "apple", "banana", "grapes", "orange", "cherry", "peach", "tomato", "carrot", "potato", "onions",
    "school", "pencil", "notebook", "teacher", "student", "marker", "eraser", "backpack", "crayons", "paper",
    "family", "mother", "father", "sister", "brother", "uncle", "auntie", "cousin", "grandma", "grandpa",
    "summer", "winter", "spring", "autumn", "holiday", "vacation", "travel", "picnic", "island", "beaches",
    "rabbit", "monkey", "turtle", "kitten", "puppy", "hamster", "donkey", "giraffe", "chicken", "parrot",
    "soccer", "basketball", "baseball", "tennis", "cricket", "boxing", "hockey", "running", "cycling", "skating",
    "planet", "galaxy", "rocket", "spaceship", "comet", "asteroid", "saturn", "jupiter", "neptune", "uranus",
    "castle", "forest", "village", "bridge", "garden", "desert", "valley", "harbor", "ocean", "island",
    "happy", "smile", "laughs", "friend", "people", "dreams", "sleepy", "magic", "party", "story",
    "window", "curtain", "mirror", "closet", "candle", "carpet", "pillow", "blanket", "sofa", "drawer"
  ];

  const keys = "abcdefghijklmnopqrstuvwxyz"


  const [strikes, setStrikes] = useState(0);
  const [word, setWord] = useState<string>(''); 
  const [revealedKeys, setRevealedKeys] = useState<Key[]>([])
  const [keyStates, setKeyStates] = useState<KeyStates>(
    Object.fromEntries(keys.split('').map((key) => [key, false])) as KeyStates
  );
  const [solved, setSolved] = useState<boolean>(false);

  function newGame() : void {
    setWord(generateWord());
    resetKeyStates();
    setStrikes(0);
    setRevealedKeys([]);
    setSolved(false);
  }

  function gameOngoing() : boolean {
    let boolean
    const wordSet = new Set(word);
    const correctKeys = revealedKeys.filter((key) => wordSet.has(key))
    if (correctKeys.length === wordSet.size) boolean = false;
    else if (strikes >= 8) boolean = false;
    else boolean = true;
    return boolean
  }

  function resetKeyStates() {
    setKeyStates(Object.fromEntries(keys.split('').map((key) => [key, false])) as KeyStates);
  }

  function generateWord() : string {
    return words[Math.floor(Math.random()*100)]
  }

  function type(key : Key) : void {
    if (!keyStates[key] && gameOngoing()) {
      // Set the new key state
      const newKeyStates = keyStates;
      newKeyStates[key] = true;
      setKeyStates(newKeyStates)

      // Add to the array of revealed letters
      const newRevealedKeys = revealedKeys.slice();
      newRevealedKeys.push(key);
      setRevealedKeys(newRevealedKeys);

      // Add a strike if not in word
      if(!word.includes(key)) setStrikes(strikes+1);
      else if (newRevealedKeys.filter((key) => new Set(word).has(key)).length === new Set(word).size) setSolved(true);
    }
  }
  
  return (
    <>
      <img className="hangman" src={'../public/hangman'+ strikes +'.png'} alt={"The Hangman with " + strikes + " strikes"} />
      <div id="word" className={ solved ? 'solved' : '' }>
        {word.split('').map((value : string, index : number) => (
          <LetterBox key={index} content={value} revealed={revealedKeys.includes(value as Key)} />
        ))}
      </div>
      <div id="keyboard">
        <div>
          <Keycap content="Q" keyState={keyStates.q} onClick={() => type('q')} />
          <Keycap content="W" keyState={keyStates.w} onClick={() => type('w')} />
          <Keycap content="E" keyState={keyStates.e} onClick={() => type('e')} />
          <Keycap content="R" keyState={keyStates.r} onClick={() => type('r')} />
          <Keycap content="T" keyState={keyStates.t} onClick={() => type('t')} />
          <Keycap content="Y" keyState={keyStates.y} onClick={() => type('y')} />
          <Keycap content="U" keyState={keyStates.u} onClick={() => type('u')} />
          <Keycap content="I" keyState={keyStates.i} onClick={() => type('i')} />
          <Keycap content="O" keyState={keyStates.o} onClick={() => type('o')} />
          <Keycap content="P" keyState={keyStates.p} onClick={() => type('p')} />
        </div>
        <div>
          <Keycap content="A" keyState={keyStates.a} onClick={() => type('a')} />
          <Keycap content="S" keyState={keyStates.s} onClick={() => type('s')} />
          <Keycap content="D" keyState={keyStates.d} onClick={() => type('d')} />
          <Keycap content="F" keyState={keyStates.f} onClick={() => type('f')} />
          <Keycap content="G" keyState={keyStates.g} onClick={() => type('g')} />
          <Keycap content="H" keyState={keyStates.h} onClick={() => type('h')} />
          <Keycap content="J" keyState={keyStates.j} onClick={() => type('j')} />
          <Keycap content="K" keyState={keyStates.k} onClick={() => type('k')} />
          <Keycap content="L" keyState={keyStates.l} onClick={() => type('l')} />
        </div>
        <div>
          <Keycap content="Z" keyState={keyStates.z} onClick={() => type('z')} />
          <Keycap content="X" keyState={keyStates.x} onClick={() => type('x')} />
          <Keycap content="C" keyState={keyStates.c} onClick={() => type('c')} />
          <Keycap content="V" keyState={keyStates.v} onClick={() => type('v')} />
          <Keycap content="B" keyState={keyStates.b} onClick={() => type('b')} />
          <Keycap content="N" keyState={keyStates.n} onClick={() => type('n')} />
          <Keycap content="M" keyState={keyStates.m} onClick={() => type('m')} />
        </div>
      </div>
      <button onClick={() => newGame()}>New game</button>
    </>
  )
}

export default App
