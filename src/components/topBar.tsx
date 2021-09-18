import { useNavigate } from "react-router";
import { ReactComponent as BackIcon } from "../assets/icons/BackIcon.svg";

const TopBar = ({title, canGoBack=true}: {title: string, canGoBack?: boolean}) => {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-10 bg-white">
      <div className="mx-3 py-2 flex border-b items-center">
          {canGoBack && <BackIcon
            className="my-2 mr-7 cursor-pointer"
            onClick={() => navigate(-1)}
          />}
        <h1 className="text-lg font-bold">{title}</h1>
      </div>
    </div>
  );
};

export default TopBar;
