import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { ReactComponent as BackIcon } from "../../assets/icons/BackIcon.svg";
import TopBar from "../../components/topBar";
import { NotificationState } from "./notificationSlice";

const Notification = () => {
  const notifications = useAppSelector(
    (state) => state.notification.notifications
  );
  const navigate = useNavigate();
  const username = useAppSelector((state) => state.auth.profile.profile.username);
  const showNotification = (notification: NotificationState) => {
    if (notification.type === "FOLLOWED") {
      return (
        <>
          <Link to={`/${notification.sender.username}`}>
            <img
              className="w-10 h-10 bg-gray-600 rounded-full border-none"
              src={notification.sender.img.profile.src}
            />
          </Link>
          <p className="mx-3"><span className="font-bold">{notification.sender.name}</span> Followed you</p>
        </>
      );
    }
    if (notification.type === "LIKED") {
      return (
        <>
          <Link className="flex items-center" to={`/${username}/${notification.onItem}`}>
            <img
              className="w-10 h-10 bg-gray-600 rounded-full border-none"
              src={notification.sender.img.profile.src}
            />
            <p className="mx-3"><span className="font-bold">{notification.sender.name}</span> liked your post</p>
          </Link>
        </>
      );
    }
  };


  return (
    <div className="flex flex-col min-h-screen">
      {/* <div className="m-3 flex border-b items-center">
        <BackIcon className="my-2 mr-7 cursor-pointer" onClick={() => navigate(-1)} />
        <h1 className="font-bold text-lg">Notifications</h1>
      </div> */}
      <TopBar title="Notifications" />
      {notifications.length === 0 && <div className="text-5xl self-center flex-grow justify-self-center flex flex-col justify-center"><h1>Hmmm.. <br /> seems<br /> empty</h1></div>}
      {notifications?.map((notification) => {
        return (
          <div
            key={notification._id}
            className={`flex p-3 px-6 border-b items-center ${
              notification.isRead ? "" : "bg-gray-300"
            }`}
          >
            {showNotification(notification)}
          </div>
        );
      })}
    </div>
  );
};

export default Notification;
