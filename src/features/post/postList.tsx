import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { isLiked, timeAgo } from "../../utils/function";
import ActionLayout from "./actionLayout";
import { PostState, reactPostAsync } from "./postSlice";
import UserLayout from "./userLayout";

const PostList = ({ posts }: { posts: PostState[] }) => {
  const profileID = useAppSelector((state) => state.auth.profile.profile._id);
  const dispatch = useDispatch();

  if (!posts) {
    return null;
  }

  const sortedPosts = posts
    .slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  
    return (
    <div>
      {sortedPosts?.map((post) => {
        const isPostLiked = isLiked(post.likes, profileID);
        console.log(post);
        return (
          <div key={post._id} className="flex flex-col border-b m-0 p-4">
            <UserLayout
              image={post.author.img.profile.src}
              name={`${post.author.name} ● ${timeAgo(post.createdAt)}`}
              username={post.author.username}
            />
            <Link to={`/${post.author.username}/${post._id}`} className="">
              <p className="text-xl mt-2">{post.body}</p>
              {post.img !== undefined && <img className="block mx-auto" src={post.img.src} />}
            </Link>
            <div className="flex flex-row justify-evenly items-center mt-2">
              <ActionLayout
                post={post}
                postID={post._id}
                isPostLiked={isPostLiked}
                likeUnlike={() => dispatch(reactPostAsync(post._id))}
                numberOfLikes={post.likes.length}
                singlePostView={false}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostList;
