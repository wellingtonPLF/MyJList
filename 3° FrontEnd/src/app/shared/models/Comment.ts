import { User } from "./User"
import { Game } from "./Game"
import { I_Comment } from "../interfaces/I_Comment"

export class Comment implements I_Comment{
    private _id?: number | undefined
    private _vote?: string | undefined
    private _content?: string
    private _publication?: string
    private _user?: User
    private _game?: Game
    
    constructor(id: number, vote: string, content: string, publication: string, user: any, game: any);
    constructor(content: string, user: User, game: any);
    constructor();
    constructor(...myarray: any[]){
        if (myarray.length === 3) {
            this._content = myarray[0]
            this._user = myarray[1]
            this._game = myarray[2]
            return;
        }
        if (myarray.length === 6) {
            this._id = myarray[0]
            this._vote = myarray[1]
            this._content = myarray[2]
            this._publication = myarray[3]
            this._user = myarray[4]
            this._game = myarray[5]
            return;
        }
    }

    static simpleRefract(comment: Comment) {
        const result = {
            id: comment!.id,
            vote: comment!.vote,
            content: comment!.content,
            publication: comment!.publication,
            user: User.simpleRefract(comment!.user),
            game: Game.simpleRefract(comment!.game)
        }
        return result;
    }

    public get id(): number | undefined {
        return this._id
    }
    public set id(value: number | undefined) {
        this._id = value
    }

    public get vote(): string | undefined {
        return this._vote
    }
    public set vote(value: string | undefined) {
        this._vote = value
    }

    get content(): string | undefined  {
        return this._content
    }
    set content(value: string | undefined )  {
        this._content = value
    }

    get publication(): string | undefined  {
        return this._publication
    }

    set publication(value: string | undefined ) {
        this._publication = value
    }

    public get user(): any | undefined {
        return this._user
    }
    public set user(value: any | undefined) {
        this._user = value
    }

    public get game(): any | undefined {
        return this._game
    }
    public set game(value: any | undefined) {
        this._game = value
    }
}