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
    parentComment: string;
    post: string;
  }
  