import axios from "axios";

export const scrollToTop = () => {
    window.scroll({
        top: 0,
        behavior: "smooth",
      });
};

export const setupAuthHeaderForServiceCalls = () => {
    const token = JSON.parse(localStorage.getItem("auth_learnfinance") as string);
    if (token) {
      return (axios.defaults.headers.common["Authorization"] = token);
    }
    delete axios.defaults.headers.common["Authorization"];
  };