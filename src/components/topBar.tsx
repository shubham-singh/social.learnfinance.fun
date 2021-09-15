import { useNavigate } from "react-router";
import { ReactComponent as BackIcon } from "../assets/icons/BackIcon.svg";

const TopBar = ({title}: {title: string}) => {
  const navigate = useNavigate();

  return (
    <div className="mx-3 py-2 flex border-b items-center">
        <BackIcon
          className="my-2 mr-7 cursor-pointer"
          onClick={() => navigate(-1)}
        />
      <h1 className="text-lg font-bold">{title}</h1>
    </div>
  );
};

export default TopBar;
