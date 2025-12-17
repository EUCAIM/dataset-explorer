
export default interface UserListItem {
    uid: string;
    username: string; //sortby
    gid: number | null; //sortby
    email: string; //sortby
    name: string; //sortby
    creationDate: string; //sortby
    disabled: boolean;
    emailVerified: boolean;
}
