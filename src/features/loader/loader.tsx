import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

const Loader = () => {

    const { status } = useAppSelector((state) => state.loader)
    const navigate = useNavigate();
    if (status === "loading") { 
        return (
          <div className="spinner center">
            <div></div>
            <div></div>
          </div>
        );
    } else if (status === "idle") {
        return null;
    } else {
        navigate("/");
        return null;
    }
  };
  
  export default Loader;