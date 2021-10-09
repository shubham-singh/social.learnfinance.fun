import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../app/hooks";
import PostList from "../post/postList";
import { ReactComponent as CreateIcon } from "../../assets/icons/CreateIcon.svg";
import Loader from "../../components/loader";
import TopBar from "../../components/topBar";
import ShowMessage from "../../components/showMessage";

const Home = ({nav, setNav}: {nav:boolean ;setNav: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const img = useAppSelector((state) => state.auth.profile.profile.img.profile.src);
    const feed = useAppSelector((state) => state.feed);
    const navigate = useNavigate();

    if (feed.status === "loading") {
        return <Loader />
    }

    return (
        <div className="sticky top-0">
            <div className="flex items-center">
                <img className="mx-3 w-8 h-8 rounded-full md:hidden" src={img} alt="profile" onClick={() => setNav(true)} />
                <TopBar title="Home" canGoBack={false} />
            </div>
            <CreateIcon className="btn-floating w-14 h-14 p-2 right-10 rounded-full bg-gray-900 shadow-lg cursor-pointer md:hidden" onClick={() => navigate('/compose')} />
            <PostList posts={feed.feed} />
            
            {feed.feed.length === 0 && <ShowMessage text="Hmm... seems empty" />}
        </div>
    );
}

export default Home;