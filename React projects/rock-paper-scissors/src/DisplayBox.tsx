type receivedProps = { owner : string, currentItem : string }

export default function DisplayBox ( { owner, currentItem } : receivedProps ) {
  return(<>
    <div className="displayBox">
      <h2>{owner}</h2>
      {currentItem}
    </div>
  </>)
}