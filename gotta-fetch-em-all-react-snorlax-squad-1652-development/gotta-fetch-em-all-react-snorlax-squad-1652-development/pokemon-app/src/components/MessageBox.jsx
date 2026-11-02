function MessageBox({ message, buttonText, onButtonClick }) {
  return (
    <div>
      <p>{message}</p>
      <button onClick={onButtonClick}>{buttonText}</button>
    </div>
  )
}

export default MessageBox