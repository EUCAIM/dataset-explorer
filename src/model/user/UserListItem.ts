
export default interface UserListItem {
    uid: string;
    username: string;
    gid: number | null;
    email: string;
    name: string;
    creationDate: string;
    disabled: boolean;
    emailVerified: boolean;
}
