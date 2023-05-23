export interface PostObj {
    _id: string;
    userId: string;
    displayName: string;
    bio: string;
    title: string;
    content: string;
    picture: string;
    date: string;
    profilePicture: string | null;
    numComments: number;
    numLikes: number;
    likes: [string]
  }