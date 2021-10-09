import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getPostAsync, reactPostAsync } from "../../utils/server.requests";
import { PostState } from "./types";
import { format, parseJSON } from "date-fns";
import { isLiked } from "../../utils/function";
import UserLayout from "./userLayout";
import ActionLayout from "./actionLayout";
import Loader from "../../components/loader";
import TopBar from "../../components/topBar";

const SinglePost = () => {
  const { username, postID } = useParams();
  const dispatch = useAppDispatch();
  const profileID = useAppSelector((state) => state.auth.profile.profile._id);
  const profile = useAppSelector((state) => state.auth.profile);
  const [post, setPost] = useState<PostState | null | 'DELETED'>(null);

  const isPostLiked =
    (post !== null && post !== 'DELETED') ? isLiked(post.likes, profileID, true) : false;

  const likeUnlike = () => {
    if (post !== null && post!== 'DELETED') {
      dispatch(reactPostAsync(post._id));
      if (isPostLiked) {
        setPost({
          ...post,
          likes: post.likes.filter((user) => user._id !== profileID),
        });
      } else {
        setPost({
          ...post,
          likes: [profile.profile, ...post.likes],
        });
      }
    }
  };

  useEffect(() => {
    getPostAsync({ postID, username }, setPost);
  }, [postID, username]);

  if (post !== null && post !== 'DELETED') {
    return (
      <div className="flex flex-col">
        <TopBar title="Post" />
        <div className="m-3">
          <UserLayout
            image={post.author.img.profile.src}
            name={post.author.name}
            username={post.author.username}
          />
          <p className="text-xl mt-4 mb-4">{post.body}</p>
          {post.img.src !== "" && <img src={post.img?.src} alt="post" className="my-3 block mx-auto" />}
          <p className="text-gray-600">
            {format(parseJSON(post.createdAt), "PPpp")}
          </p>
          <div className="flex flex-row justify-evenly items-center border-t border-b p-2">
            <ActionLayout
              post={post}
              isPostLiked={isPostLiked}
              likeUnlike={likeUnlike}
              numberOfLikes={post.likes.length}
              singlePostView={true}
            />
          </div>
        <div className="mx-3">
          {post.replies.map(reply => {
            return (
              <div key={reply._id} className="py-2 border-b">
                <UserLayout
                  image={reply.author.img.profile.src}
                  name={reply.author.name}
                  username={reply.author.username}
                />
                <p className="text-xl mt-4 mb-4">{reply.body}</p>
                {reply.img.src !== "" && <img src={reply.img.src} alt="post" className="my-3 block mx-auto" />}
              </div>
            )
          })}
        </div>
        </div>
      </div>
    );
  } else if (post === 'DELETED') {
    return <div className="text-center p-5 font-bold">This post no longer exists</div>
  } else {
    return <Loader />;
  }
};

export default SinglePost;
