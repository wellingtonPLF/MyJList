export interface I_User {
    id?: number;
    nickname?: string;
    bornDate?: string;
    auth?: number;
    status?: string,
    joined?: string,
    friend: Array<any>,
    nationality?: any,
    playing: number,
    onHold: number,
    planning: number,
    dropped: number,
    completed: number,
    replayed: number,
    hours: number,
    note: string,
    recommendations: number,
    sexuality?: string,
    role?: any,
    email?: string,
    userImage?: any,
    lastUpdated?: any,
    favoriteGames?: any
}
