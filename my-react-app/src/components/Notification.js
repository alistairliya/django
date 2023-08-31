
const Notification = ({userNotification}) => {
  return (
    <tbody>
        <tr>
    <td><div>Notification {userNotification.notification.message_text}</div></td>
    </tr>
    </tbody>
  )
}

export default Notification