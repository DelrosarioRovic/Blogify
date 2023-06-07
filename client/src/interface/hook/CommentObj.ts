export interface Comment {
    _id: string;
    text: string;
    date: string;
    user: {
      _id: string;
      displayName: string;
      profilePicture: string;
      bio: string;
    };
    replies: Comment[];
    likeCount: number;
    parentComment: string;
    post: string;
    likes: [string];
  }
  