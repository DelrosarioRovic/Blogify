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
    likeCount: number;
    parentComment: string;
    post: string;
  }
  