import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { showSnackbar } from "../snackbar/snackbarSlice";
import { ReactComponent as CopyLinkIcon } from "../../assets/icons/CopyLink.svg";
import { ReactComponent as HeartFillIcon } from "../../assets/icons/HeartFill.svg";
import { ReactComponent as HeartOutlineIcon } from "../../assets/icons/HeartOutline.svg";
import { ReactComponent as ReplyIcon } from "../../assets/icons/ReplyIcon.svg";
import { useNavigate } from "react-router";
import { ReactComponent as DeleteIcon } from "../../assets/icons/DeleteIcon.svg";
import { deletePostAsync } from "../../utils/server.requests";
import { PostState } from "./postSlice";

const ActionLayout = ({
  post,
  likeUnlike,
  isPostLiked,
  numberOfLikes,
  singlePostView,
}: {
  post: PostState;
  likeUnlike: Function;
  isPostLiked: boolean;
  numberOfLikes: number;
  singlePostView: boolean;
}) => {
  const loggedIn = useAppSelector((state) => state.auth.loggedIn);
  const userID = useAppSelector(state => state.auth.profile.profile._id); 
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const copyToClipboard = () => {
    const url = new URL(window.location.href);
    if (singlePostView) {
      navigator.clipboard.writeText(url.href);
    } else {
      navigator.clipboard.writeText(`${url.host}/${post.author.username}/${post._id}`);
    }
    dispatch(showSnackbar("Copied to clipboard"));
  };

  return (
    <>
    <div className="flex flex-row justify-center items-center">
        <ReplyIcon className="cursor-pointer" onClick={() => navigate(`/reply/${post.author.username}/${post._id}/`)} />
          <span className="ml-2 text-gray-600 text-lg">{post.replies.length}</span>
    </div>
      <div className="flex flex-row justify-center items-center">
        <span onClick={() => (loggedIn ? likeUnlike() : navigate("/login"))}>
          {isPostLiked ? (
            <HeartFillIcon className="inline-block cursor-pointer" />
          ) : (
            <HeartOutlineIcon className="inline-block cursor-pointer" />
          )}
        </span>
        <span className="ml-2 text-gray-600 text-lg">{numberOfLikes}</span>
      </div>
      <CopyLinkIcon className="cursor-pointer" onClick={copyToClipboard} />
      {(singlePostView && post.author._id === userID) && (
        <DeleteIcon
          className="cursor-pointer"
          onClick={() => {
            dispatch(deletePostAsync(post._id));
            setTimeout(() => {
              navigate("/home");
            }, 1000);
          }}
        />
      )}
    </>
  );
};

export default ActionLayout;
