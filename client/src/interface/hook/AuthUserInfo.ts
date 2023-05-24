export interface AuthUserInfo {
    _id: string;
    email: string;
    displayName: string;
    profilePicture: string | null;
    bio: string | null;
    followed?: string[];
}