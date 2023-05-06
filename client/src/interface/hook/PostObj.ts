export interface PostObj {
    _id: string;
    userId: string;
    displayName: string;
    title: string;
    content: string;
    date: string;
    profilePicture: string | null;
    numComments: number;
    numLikes: number;
  }