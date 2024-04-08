
const Notification = ({ notification }) => {

	if (!notification.message)
		return;
	console.log(notification.message);
	if (notification.success){
		return <div className="success notification">{notification.message}</div>
	}
	return <div className="error notification">{notification.message}</div>
}

export default Notification