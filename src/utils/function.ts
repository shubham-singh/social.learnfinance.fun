import axios from "axios";
import { formatDistanceToNow, parseISO } from "date-fns";
import { PostState } from "../features/post/postSlice";

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

export const deleteAuthToken = () => {
  localStorage.removeItem("auth_learnfinance");
  setTimeout(() => {
    window.location.reload();
  }, 0)
};

export const isLiked = (likeArr: string[] | any[], userID: string, DetailedLikeArray: boolean = false) => {
  if (DetailedLikeArray) {
    return likeArr.some(user => user._id === userID);
  } return likeArr.some(id => id === userID);
}

export const isFollowing = (following: string[], profileID: string) => {
  return following.some(userID => userID === profileID);
}

export const timeAgo = (timestamp: string) => {
  let timeAgo = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`
  }
  return timeAgo;
}