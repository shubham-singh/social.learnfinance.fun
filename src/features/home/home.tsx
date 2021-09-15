import { Link, useNavigate } from "react-router-dom"
import { useAppSelector } from "../../app/hooks";
import PostList from "../post/postList";
import { ReactComponent as CreateIcon } from "../../assets/icons/CreateIcon.svg";
import Loader from "../loader/loader";

const Home = () => {
    const feed = useAppSelector((state) => state.feed);
    const navigate = useNavigate();
    if (feed.status === "loading") {
        return <Loader />
    }
    return (
        <div>
            {/* <Link to="/profile/create">create profile</Link> */}
            <h1 className="heading text-center my-2">Learn Finance</h1>
            <CreateIcon className="btn-floating w-14 h-14 p-2 right-10 rounded-full bg-gray-900 shadow-lg cursor-pointer" onClick={() => navigate('/compose')} />
            <PostList posts={feed.feed} />
        </div>
    );
}

export default Home;