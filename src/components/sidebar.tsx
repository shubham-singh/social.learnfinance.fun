import { useAppSelector } from "../app/hooks";
import ComposePost from "../features/post/composePost";
import Search from "../components/search";

const Sidebar = () => {
  const loggedIn = useAppSelector((state) => state.auth.loggedIn);

  if (!loggedIn) {
    return (
      <div className="w-1/4 hidden md:block md:sticky md:top-0">
        <Search />
      </div>
    );
  }

  return (
    <div className="w-1/4 hidden md:block md:sticky md:top-0">
      <Search />
      <ComposePost />
    </div>
  );
};

export default Sidebar;
