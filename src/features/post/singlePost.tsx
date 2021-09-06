import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { getPostAsync } from "../../utils/server.requests";
import Loader from "../loader/loader";
import { PostState, UserState } from "./postSlice";

const SinglePost = () => {
    
    const { username, postID } = useParams();  
    const profileID = useAppSelector(state => state.profile.profile._id)
    const [post, setPost] = useState<PostState | null>(null);
    
    function isLiked (likeArr: UserState[], userID: string) {
        return likeArr.some(user => user._id === userID)
    }
    
    useEffect(() => {
        getPostAsync({postID, username}, setPost);
    }, [])

    if (post !== null) {
        return (
            <div>
                <div>
                    <img src={post.author.img.profile}/>
                    <div>
                        <h1>{post.author.name}</h1>
                        <h3>@{post.author.username}</h3>
                    </div>
                </div>
                <p>{post.body}</p>
                <p>{post.likes.length}{isLiked(post.likes, profileID) ? "Unlike" : "Like"}</p>
            </div>
        );
    }
    return <Loader />
}

export default SinglePost;