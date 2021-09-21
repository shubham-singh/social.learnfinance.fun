import { useNavigate } from "react-router";
import Acquaintance from "../../components/acquaintance";
import { ProfileInterface } from "./profileSlice";
import DisplayProfileImage from "../../components/displayProfileImage";
import { useAppDispatch } from "../../app/hooks";
import { showSnackbar } from "../snackbar/snackbarSlice";

const ProfileUserLayout = ({
  profile,
  loggedIn,
  isUserFollowing,
  isUserProfileSameAsProfile,
  followUnfollow,
}: {
  profile: ProfileInterface;
  loggedIn: boolean;
  isUserFollowing: boolean;
  isUserProfileSameAsProfile: boolean;
  followUnfollow: Function;
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <>
      <div className="flex justify-center items-center h-1/4">
        <DisplayProfileImage
          img={profile.profile.img.cover.src}
          className="min-h-full min-w-full flex-shrink-0 block bg-gray-200"
        />
      </div>

      <div className="flex flex-col relative -top-10 md:-top-4">
        <div className="flex justify-between mx-6">
          <DisplayProfileImage
            img={profile.profile.img.profile.src}
            className="w-24 h-24 md:w-36 md:h-36 rounded-full border-4 border-white bg-gray-400"
          />

          <button
            className="self-end my-2 bg-black text-white px-6 py-2 border-none rounded-full"
            onClick={() =>
              isUserProfileSameAsProfile
                ? navigate("/profile/setup")
                : profile.userExists
                ? followUnfollow()
                : dispatch(showSnackbar("User does not exist"))
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
          <Acquaintance
            followingCount={profile.profile.following.length}
            followerCount={profile.profile.followers.length}
          />
        </div>
      </div>
    </>
  );
};

export default ProfileUserLayout;
