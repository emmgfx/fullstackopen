export const Notification = ({ type, message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={"notification " + type}>
      {message}
    </div>
  )
}