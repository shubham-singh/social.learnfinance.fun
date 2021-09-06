import { Link } from "react-router-dom"
import { useAppSelector } from "../../app/hooks";
import CreatePost from "../post/createPost";
import PostList from "../post/postList";

const Home = () => {
    const feed = useAppSelector((state) => state.feed.feed)
    return (
        <h1>
            <Link to="/profile/create">create profile</Link>
            <CreatePost />
            <PostList posts={feed} />
        </h1>
    );
}

export default Home;