export interface LoginInfo {
    accessToken: string
    user: Users
}
export interface Users {
    id: number
    account: string
    email: string
    name: string
    mobile: string
}

export interface IMyInterface {
    key: string;
}
