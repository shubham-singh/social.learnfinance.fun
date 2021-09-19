import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../app/hooks";
import { createPostAsync } from "../../utils/server.requests";
import { ReactComponent as BackIcon } from "../../assets/icons/BackIcon.svg";
import { ReactComponent as ImageIcon } from "../../assets/icons/ImageIcon.svg";

interface newPostState {
  body: string;
  image: File | null;
}

const ComposePost = () => {
  const [post, setPost] = useState({} as newPostState);
  const image = useAppSelector((state) => state.auth.profile.profile.img.profile.src);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCLick = () => {
    let postForm = new FormData();
    postForm.append("body", post.body);
    if (post.image !== null) {
      postForm.append("image", post.image);
    }
    dispatch(createPostAsync(postForm));
    setPost({body: "", image: null});
    setTimeout(() => {
      navigate("/home");
    }, 400);
  };

  return (
    <div className="flex flex-col m-2 p-4 h-screen">
      <div className="flex justify-between items-center py-2">
        <BackIcon className="cursor-pointer md:hidden" onClick={() => navigate("/home")} />
        <button
          className="inline-block px-6 py-2 rounded-xl text-white bg-gray-600 cursor-pointer"
          onClick={handleCLick}
        >
          Post
        </button>
      </div>
      <div className="flex h-1/2 flex-row mt-4">
        <div className="flex flex-col items-center">
          <img
            className="w-12 h-12 bg-gray-600 rounded-full border-none"
            src={image}
            />
            <label htmlFor="image" className="mt-6"><ImageIcon /></label>
          <input type="file" id="image" name="image" className="hidden" onChange={(e) => setPost({...post, image: e.target.files![0]})} />
        </div>
        <textarea
          className="block flex-grow h-full p-2 text-xl"
          placeholder="What's happening?"
          value={post.body}
          onChange={(e) => setPost({...post, body: e.target.value})}
          maxLength={280}
          autoFocus
        />
      </div>
    </div>
  );
};

export default ComposePost;
