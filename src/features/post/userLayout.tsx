import { Link } from "react-router-dom";

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
        <img
          className="w-12 h-12 bg-gray-600 rounded-full border-none"
          src={image}
          alt="profile"
        />
      </Link>
      <div className="ml-4">
        <h1 className="truncate ...">
          {name}
        </h1>
        <h1 className="">{`@${username}`}</h1>
      </div>
    </div>
  );
};

export default UserLayout;
