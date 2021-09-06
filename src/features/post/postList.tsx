import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { PostState, reactPostAsync } from "./postSlice";
import TimeAgo from "./timeAgo";

const PostList = ({posts} : {posts: PostState[]}) => {
  // const posts = useAppSelector((state) => state.post.posts);
  const profileID = useAppSelector((state) => state.profile.profile._id);
  const dispatch = useDispatch();

  const isLiked = (likeArr: string[], profileID: string) => {
    return likeArr.some(id => id === profileID);
  }

  const sortedPosts = posts?.slice().sort((a,b) => b.createdAt.localeCompare(a.createdAt) )

  return (
    <div>
      {/* {posts?.map((post) => { */}
      {sortedPosts?.map((post) => {
        return (
          <div key={post._id}>
            <Link to={`/${post.author.username}/${post._id}`}>{post.body}</Link>
            <TimeAgo timestamp={post.createdAt} />
            <button
              className="block"
              onClick={() => dispatch(reactPostAsync(post._id))}
            >
              {post?.likes.length}
              {isLiked(post.likes, profileID) ? "unlike" : "like"}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default PostList;
