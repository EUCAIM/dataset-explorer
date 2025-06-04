
export default interface User {
    uid: string;
    username: string;
    gid: number;
    name: string;
    email: string;
    siteCode: string;
    roles: string[];
    projects: string[];
    attributesFromAuthService: UserAttributeGroup[];
}

export interface UserAttributeGroup {
    displayName: string;
    attributes: UserAttribute[];
}

export interface UserAttribute {
    displayName: string;
    values: string[] | string;
}
