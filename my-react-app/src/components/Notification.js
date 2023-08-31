
const Notification = ({userNotification}) => {
  // Want the form:
  // Eugene Lin submitted Business ID 123 for REVIEW
    return (
    <tbody>
    <tr>
        <td>
            <div>
                Notification {userNotification.notification.message_text}
            </div>
        </td>
    </tr>
    </tbody>
  )
}

export default Notification