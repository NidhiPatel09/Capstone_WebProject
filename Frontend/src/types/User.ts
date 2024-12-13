export default interface User {
    _id?: string;
    email?: string;
    favoriteRecipes: string[];
    facebookId?: string;
    displayName?: string;
    profilePicture?: string;
    password?: string;
    role?: string;
}
