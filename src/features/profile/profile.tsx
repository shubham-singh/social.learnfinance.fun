import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  followAsync,
  getProfileByUsernameAsync,
  unfollowAsync,
} from "../../utils/server.requests";
import PostList from "../post/postList";
import { getAllPostAsync } from "../post/postSlice";
import { ReactComponent as BackIcon } from "../../assets/icons/BackIcon.svg";
import { isFollowing } from "../../utils/function";

const Profile = () => {
  const { username } = useParams();
  const loggedIn = useAppSelector((state) => state.auth.loggedIn);
  const userProfile = useAppSelector((state) => state.auth.profile);
  const profile = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isUserProfileSameAsProfile = profile.profile._id === userProfile.profile._id;
  const isUserFollowing = loggedIn ? isFollowing(userProfile.profile.following, profile.profile._id) : false;

  const followUnfollow = () => {
    if (!loggedIn) {
      return navigate("/login");
    }
    if (isUserFollowing) {
      dispatch(
        unfollowAsync({
          profileID: profile.profile._id,
          userID: userProfile.profile._id,
        })
      );
    } else {
      dispatch(
        followAsync({
          profileID: profile.profile._id,
          userID: userProfile.profile._id,
        })
      );
    }
  };

  useEffect(() => {
    dispatch(getProfileByUsernameAsync(username));
    dispatch(getAllPostAsync(username));
  }, [username]);

  return (
    <div className="h-screen">
      <div className="flex flex-col">
        <div className="w-full h-1/4 bg-white relative">
          <BackIcon
            className="absolute top-4 left-3 rounded-full bg-white"
            onClick={() => navigate(-1)}
          />
          <img
            className="h-full object-cover block"
            src={profile.profile.img.cover}
          />
          <img
            className="w-24 h-24 rounded-full absolute top-2/3 left-7 border-4 border-white"
            src={profile.profile.img.profile}
          />
        </div>
        <button
          className="self-end mx-6 my-2 bg-black text-white px-6 py-2 border-none rounded-full"
          onClick={() => isUserProfileSameAsProfile ? navigate("/") : followUnfollow()}
        >
          {loggedIn ? (isUserFollowing ? "Unfollow" : (isUserProfileSameAsProfile ? "Edit profile" : "Follow")) : "Follow"}
        </button>
        <div className="mx-7 my-3">
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
        <div className="border-t">
          <PostList posts={profile.posts} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
