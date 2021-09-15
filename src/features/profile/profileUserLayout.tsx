import { useNavigate } from "react-router";
import { ProfileState } from "./profileSlice";

const ProfileUserLayout = ({
  profile,
  loggedIn,
  isUserFollowing,
  isUserProfileSameAsProfile,
  followUnfollow,
}: {
  profile: ProfileState;
  loggedIn: boolean;
  isUserFollowing: boolean;
  isUserProfileSameAsProfile: boolean;
  followUnfollow: Function;
}) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full h-1/4">
        <img
          className="min-h-full object-cover block bg-gray-200"
          src={profile.profile.img.cover}
        />
      </div>

      <div className="flex flex-col relative -top-10">
        <div className="flex justify-between mx-6">
          <img
            className="w-24 h-24 md:w-36 md:h-36 rounded-full border-4 border-white bg-gray-400"
            src={profile.profile.img.profile}
          />
          <button
            className="self-end my-2 bg-black text-white px-6 py-2 border-none rounded-full"
            onClick={() =>
              isUserProfileSameAsProfile ? navigate("/") : followUnfollow()
            }
          >
            {loggedIn
              ? isUserFollowing
                ? "Unfollow"
                : isUserProfileSameAsProfile
                ? "Edit profile"
                : "Follow"
              : "Follow"}
          </button>
        </div>
        <div className="mx-7">
          <p className="font-bold">{profile.profile.name}</p>
          <p className="">@{profile.profile.username}</p>
          <p className="mt-4 my-2">{profile.profile.bio}</p>
          <div className="flex flex-row">
            <p className="mr-7">
              <span className="font-bold">
                {profile.profile.following.length}
              </span>{" "}
              Following
            </p>
            <p>
              <span className="font-bold">
                {profile.profile.followers.length}
              </span>{" "}
              Followers
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileUserLayout;
