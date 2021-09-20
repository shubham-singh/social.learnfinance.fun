import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteSnackbar } from "./snackbarSlice";

const Snackbar = () => {
  const { visible, message } = useAppSelector((state) => state.snackbar);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timerID = setTimeout(() => {
      if (visible) {
        dispatch(deleteSnackbar());
      }
    }, 2000);
    return function () {
      clearTimeout(timerID);
    };
  }, [visible, dispatch]);

  return (
    <>
      {visible && (
        <div className="fixed z-20 left-1/2 transform -translate-x-1/2 top-3/4 bg-gray-700 px-3 py-1 text-white rounded-full shadow-xl">
          <p>{message}</p>
        </div>
      )}
    </>
  );
};

export default Snackbar;
