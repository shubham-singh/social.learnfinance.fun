import { Link, useNavigate } from "react-router-dom"
import { useAppSelector } from "../../app/hooks";
import CreatePost from "../post/composePost";
import PostList from "../post/postList";
import { ReactComponent as CreateIcon } from "../../assets/icons/CreateIcon.svg";

const Home = () => {
    const feed = useAppSelector((state) => state.feed.feed);
    const navigate = useNavigate();
    return (
        <h1>
            <Link to="/profile/create">create profile</Link>
            <CreateIcon className="btn-floating w-14 h-14 p-2 right-10 rounded-full bg-gray-900" onClick={() => navigate('/compose')} />
            <PostList posts={feed} />
        </h1>
    );
}

export default Home;