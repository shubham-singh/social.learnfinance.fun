import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import DisplayProfileImage from "../../components/displayProfileImage";
import TopBar from "../../components/topBar";
import { readNotificationAsync } from "../../utils/server.requests";
import { NotificationState } from "./notificationSlice";

const Notification = () => {
  const notifications = useAppSelector(
    (state) => state.notification.notifications
  );
  const dispatch = useDispatch();
  const username = useAppSelector(
    (state) => state.auth.profile.profile.username
  );
  const showNotification = (notification: NotificationState) => {
    if (notification.type === "FOLLOWED") {
      return (
        <>
          <Link to={`/${notification.sender.username}`}>
            <DisplayProfileImage
              img={notification.sender.img.profile.src}
              className="w-10 h-10 bg-gray-400 rounded-full border-none"
            />
          </Link>
          <p className="mx-3">
            <span className="font-bold">{notification.sender.name}</span>{" "}
            Followed you
          </p>
        </>
      );
    }
    if (notification.type === "LIKED") {
      return (
        <>
          <Link
            className="flex items-center"
            to={`/${username}/${notification.onItem}`}
          >
            <DisplayProfileImage
              img={notification.sender.img.profile.src}
              className="w-10 h-10 bg-gray-400 rounded-full border-none"
            />

            <p className="mx-3">
              <span className="font-bold">{notification.sender.name}</span>{" "}
              liked your post
            </p>
          </Link>
        </>
      );
    }
    if (notification.type === "REPLY") {
      return (
        <>
          <Link
            className="flex items-center"
            to={`/${username}/${notification.onItem}`}
          >
            <DisplayProfileImage
              img={notification.sender.img.profile.src}
              className="w-10 h-10 bg-gray-400 rounded-full border-none"
            />

            <p className="mx-3">
              <span className="font-bold">{notification.sender.name}</span>{" "}
              replied to your post
            </p>
          </Link>
        </>
      );
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar title="Notifications" />
      {notifications.length === 0 && (
        <div className="text-5xl self-center flex-grow justify-self-center flex flex-col justify-center">
          <h1>
            Hmmm.. <br /> seems
            <br /> empty
          </h1>
        </div>
      )}
      {notifications?.map((notification) => {
        return (
          <div
            key={notification._id}
            className={`flex p-3 px-6 border-b items-center ${
              notification.isRead ? "" : "bg-gray-300"
            }`}
            onClick={() => dispatch(readNotificationAsync(notification._id))}
          >
            {showNotification(notification)}
          </div>
        );
      })}
    </div>
  );
};

export default Notification;
