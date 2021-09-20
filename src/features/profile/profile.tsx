import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { followAsync, getProfileByUsernameAsync, unfollowAsync, getAllPostAsync } from "../../utils/server.requests";
import PostList from "../post/postList";
import { isFollowing } from "../../utils/function";
import Loader from "../../components/loader";
import TopBar from "../../components/topBar";
import ProfileUserLayout from "./profileUserLayout";
import ShowMessage from "../../components/showMessage";

const Profile = () => {
  const { username } = useParams();
  const loggedIn = useAppSelector((state) => state.auth.loggedIn);
  const userProfile = useAppSelector((state) => state.auth.profile);
  const profile = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isUserProfileSameAsProfile =
    profile.profile._id === userProfile.profile._id;
  const isUserFollowing = loggedIn
    ? isFollowing(userProfile.profile.following, profile.profile._id)
    : false;

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
  }, [username, dispatch]);

  if (profile.status === "loading") {
    return <Loader />;
  }
  return (
    <div className="h-screen">
      <TopBar title={profile.profile.name} />
      <ProfileUserLayout
        profile={profile}
        loggedIn={loggedIn}
        isUserFollowing={isUserFollowing}
        isUserProfileSameAsProfile={isUserProfileSameAsProfile}
        followUnfollow={followUnfollow}
      />
      <div className="border-t">
        {profile.userExists && <PostList posts={profile.posts} />}
        {!profile.userExists && (
          <ShowMessage text="This account doesn’t exist" />
        )}
      </div>
    </div>
  );
};

export default Profile;
