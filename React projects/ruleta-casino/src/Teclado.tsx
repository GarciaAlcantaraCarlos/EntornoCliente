import Tecla from "./Tecla"
import './Teclado.css'

export default function Teclado () {
  const tempArray = Array.from({ length: 36 }, (_, i) => i + 1);

  return (
    <div className="bid-board">
      <div className="board-numbers">
        {tempArray.map((i) => (<Tecla key={i} textContent={String(i)} bidKey={`num,${i}`} />))}
      </div>
      <div className="board-house">
        <Tecla textContent='0' bidKey='num,0' />
      </div>
      <div className="board-rows">
        <Tecla textContent='row' bidKey='row,1' />
        <Tecla textContent='row' bidKey='row,2' />
        <Tecla textContent='row' bidKey='row,3' />
      </div>
      <div className="board-columns">
        <Tecla textContent='1-12' bidKey='cols,1' />
        <Tecla textContent='13-24' bidKey='cols,2' />
        <Tecla textContent='25-36' bidKey='cols,3' />
      </div>
      <div className="board-specials">
        <Tecla textContent='Even' bidKey='even,true' />
        <Tecla textContent='1st half' bidKey='half,1' />
        <Tecla textContent='rojo' bidKey='color,true' />
        <Tecla textContent='negro' bidKey='color,false' />
        <Tecla textContent='2nd half' bidKey='half,2' />
        <Tecla textContent='Odd' bidKey='even,false' />
      </div>
    </div>
  )
}