import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { POST } from "../../utils/api.routes";
// import { likePostAsync } from "../../utils/server.requests";
// import { getAllPostAsync } from "../../utils/server.requests";

export interface UserState {
  _id: string;
  img: {
    profile: {
      src: string;
    };
  };
  name: string;
  username: string;
}

export interface ReplyState {
  author: UserState;
  body: string;
  img?: {
    src: string;
  }
  likes: any[];
  createdAt: string;
}

export interface PostState {
  _id: string;
  author: UserState;
  body: string;
  img?: {
    src: string
  }
  likes: any[];
  replies: ReplyState[];
  createdAt: string;
}

export interface PostInterface {
  posts: PostState[];
}

export const getAllPostAsync = createAsyncThunk(
  "post/getAllPost",
  async (username: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${POST}/${username}`);
      if (response.data.success) {
        return response.data;
      } else throw new Error("could not get your posts");
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const reactPostAsync = createAsyncThunk(
  "post/like",
  async (postID: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(`${POST}/${postID}/react`, { postID });
      if (response.data.success) {
        return response.data;
      }
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  posts: [],
} as PostInterface;

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload.post);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPostAsync.pending, (state, action) => {
        state.posts = [];
      })
      .addCase(getAllPostAsync.fulfilled, (state, action) => {
        return {
          posts: state.posts.concat(action.payload.posts.posts),
        };
      })
      // .addCase(reactPostAsync.fulfilled, (state, action) => {
      //   const existingPost = state.posts.findIndex(
      //     (post) => post._id === action.payload.post._id
      //   );
      //   if (
      //     state.posts[existingPost].likes.includes(action.payload.profileID)
      //   ) {
      //     const newLikes = state.posts[existingPost].likes.filter(
      //       (id) => id !== action.payload.profileID
      //     );
      //     state.posts[existingPost].likes = newLikes;
      //   } else {
      //     state.posts[existingPost].likes.push(action.payload.profileID);
      //   }
      // });
    // builder.addCase(getAllPostAsync.fulfilled, (state, action) => {
    //     console.log(action.payload.posts.posts);
    //   state.posts.concat(action.payload.posts.posts);
    // });
  },
});

export const { addPost } = postSlice.actions;

export default postSlice.reducer;
