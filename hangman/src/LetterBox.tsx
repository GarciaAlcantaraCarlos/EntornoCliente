type receivedProps = { content : string, revealed : boolean }

export default function Keycap ( {content, revealed} : receivedProps) {
  return(<div className={'letterBox'}>{(revealed) ? content : ''}</div>)
}