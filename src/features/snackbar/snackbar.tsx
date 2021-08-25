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
      }, 2000)
    return function () {
      clearTimeout(timerID);
    }
  })

  return (
    <>
      {visible && (
        <div className="snackbar">
          <p>{message}</p>
        </div>
      )}
    </>
  );
};

export default Snackbar;
