import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../app/hooks";
import { createPostAsync } from "../../utils/server.requests";
import { ReactComponent as BackIcon } from "../../assets/icons/BackIcon.svg";

const ComposePost = () => {
  const [post, setPost] = useState("");
  const image = useAppSelector((state) => state.auth.profile.profile.img.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCLick = () => {
    dispatch(createPostAsync(post));
    setPost("");
    setTimeout(() => {
      navigate("/home");
    }, 400);
  };

  return (
    <div className="flex flex-col m-2 p-4 h-screen">
      <div className="flex justify-between items-center">
        <BackIcon onClick={() => navigate("/home")} />
        <button
          className="inline-block px-6 py-2 rounded-xl text-white bg-gray-600"
          onClick={handleCLick}
        >
          Post
        </button>
      </div>
      <div className="flex h-1/2 flex-row mt-4">
        <img
          className="w-12 h-12 bg-gray-600 rounded-full border-none"
          src={image}
        />
        <textarea
          className="block flex-grow h-full p-2 text-xl"
          placeholder="What's happening?"
          value={post}
          onChange={(e) => setPost((post) => e.target.value)}
          autoFocus
        />
      </div>
    </div>
  );
};

export default ComposePost;
