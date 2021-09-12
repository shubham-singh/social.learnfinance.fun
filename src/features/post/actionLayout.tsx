import { useAppDispatch } from "../../app/hooks";
import { showSnackbar } from "../snackbar/snackbarSlice";
import { ReactComponent as CopyLinkIcon } from "../../assets/icons/CopyLink.svg";
import { ReactComponent as HeartFillIcon } from "../../assets/icons/HeartFill.svg";
import { ReactComponent as HeartOutlineIcon } from "../../assets/icons/HeartOutline.svg";

const ActionLayout = ({
  likeUnlike,
  isPostLiked,
  numberOfLikes,
}: {
  likeUnlike: Function;
  isPostLiked: boolean;
  numberOfLikes: number;
}) => {
  const dispatch = useAppDispatch();
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    dispatch(showSnackbar("Copied to clipboard"));
  };

  return (
    <>
      <div className="flex flex-row justify-center items-center">
        <span onClick={() => likeUnlike()}>
          {isPostLiked ? (
            <HeartFillIcon className="inline-block cursor-pointer" />
          ) : (
            <HeartOutlineIcon className="inline-block cursor-pointer" />
          )}
        </span>
        <span className="ml-2 text-gray-600 text-lg">{numberOfLikes}</span>
      </div>
      <CopyLinkIcon className="cursor-pointer" onClick={copyToClipboard} />
    </>
  );
};

export default ActionLayout;
