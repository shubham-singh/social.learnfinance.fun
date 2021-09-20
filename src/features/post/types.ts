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
    img: {
      src: string;
    }
    likes: any[];
    createdAt: string;
  }
  
  export interface PostState {
    _id: string;
    author: UserState;
    body: string;
    img: {
      src: string
    }
    likes: any[];
    replies: ReplyState[];
    createdAt: string;
  }
  