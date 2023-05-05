export interface Comment {
    _id: string;
    text: string;
    date: string;
    user: {
      _id: string;
      displayName: string;
      profilePicture: string;
    };
    replies: Comment[];
    likes: string[];
    parentComment: string;
    post: string;
  }
  