import { Link } from "react-router-dom";
import DisplayProfileImage from "../../components/displayProfileImage";

const UserLayout = ({
  image,
  name,
  username,
}: {
  image: string;
  name: string;
  username: string;
}) => {
  return (
    <div className="flex flex-row items-center">
      <Link to={`/${username}`}>
        <DisplayProfileImage img={image} className="w-12 h-12 bg-gray-400 rounded-full border-none" />
      </Link>
      <div className="ml-4">
        <h1 className="truncate ...">{name}</h1>
        <h1 className="">{`@${username}`}</h1>
      </div>
    </div>
  );
};

export default UserLayout;
