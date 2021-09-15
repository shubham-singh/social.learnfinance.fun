import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getPostAsync } from "../../utils/server.requests";
import { PostState, reactPostAsync, UserState } from "./postSlice";
import Loader from "../loader/loader";
import { format, parseJSON } from "date-fns";
import { isLiked } from "../../utils/function";
import UserLayout from "./userLayout";
import ActionLayout from "./actionLayout";
import { ReactComponent as BackIcon } from "../../assets/icons/BackIcon.svg";

const SinglePost = () => {
  const { username, postID } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const profileID = useAppSelector((state) => state.auth.profile.profile._id);
  const profile = useAppSelector((state) => state.auth.profile);
  const [post, setPost] = useState<PostState | null>(null);

  const isPostLiked = post !== null ? isLiked(post.likes, profileID, true) : false;

  const likeUnlike = () => {
      if (post !== null) {
          dispatch(reactPostAsync(post._id));
          if (isPostLiked) {
              setPost({
                  ...post,
                  likes: post.likes.filter(user => user._id !== profileID)
              })
          } else {
              setPost({
                  ...post,
                  likes: [profile.profile, ...post.likes]
              })
          }
      }
  }

  useEffect(() => {
    getPostAsync({ postID, username }, setPost);
  }, []);

  if (post !== null) {
    return (
        <div className="flex flex-col m-3">
          <div className="mb-3 flex border-b items-center">
            <BackIcon className="my-2 mr-7 cursor-pointer" onClick={() => navigate(-1)} />
            <h1 className="text-lg font-bold">Post</h1>
          </div>
            <UserLayout image={post.author.img.profile} name={post.author.name} username={post.author.username} />
        <p className="text-xl mt-4 mb-4">{post.body}</p>
        <p className="text-gray-600">
            {format(parseJSON(post.createdAt), 'PPpp')}
        </p>
        <div className="flex flex-row justify-evenly items-center border-t border-b p-2">
          <ActionLayout isPostLiked={isPostLiked} likeUnlike={likeUnlike} numberOfLikes={post.likes.length} />
        </div>
      </div>
    );
  }
  return <Loader />;
};

export default SinglePost;