import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPostAsync } from "../../utils/server.requests";

const CreatePost = () => {

    const [post, setPost] = useState("");
    const dispatch = useDispatch();

    const handleCLick = () => {
        dispatch(createPostAsync(post));
        setPost("");
    }

    return (
        <div>
            <textarea placeholder="What's happening?" value={post} onChange={(e) => setPost(post => e.target.value)} />
            <button onClick={handleCLick}>Post</button>
        </div>
        
    );
}

export default CreatePost;