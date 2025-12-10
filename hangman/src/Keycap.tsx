type receivedProps = { content : string, keyState : boolean, onClick : () => void }

export default function Keycap ( {content, keyState, onClick} : receivedProps) {
  return (<button
            className={keyState ? 'used' : ''}
            onClick={() => onClick() }>{content}
          </button>)
}