import { User } from "../models/User"

export interface I_Comment {
    id?: number,
    vote?: string,
    content?: string,
    publication?: string,
    user?: User,
    game?: any
}
