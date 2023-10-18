import { Game } from "./Game"
import { Tag } from "./Tag"
import { User } from "./User"

export class Registry {
    private _id?: number | undefined
    private _progress?: string
    private _note?: string
    private _updateDate?: string
    private _favorite?: boolean
    private _recommendation?: boolean
    private _tag!: Tag
    private _user!: User
    private _game!: Game

    constructor(id: number, progress: string, note: string | undefined, updateDate: string | undefined, favorite: boolean, recommendation: boolean, tag: Tag, user: User, game: Game);
    constructor(progress: string, note: string  | undefined, favorite: string, recommendation: boolean, tag: Tag, user: User, game: Game);
    constructor(user: User, game: Game, tag: Tag);
    constructor();
    constructor(...myarray: any[]) {
        if (myarray.length === 9) {
            this._id = myarray[0]
            this._progress = myarray[1]
            this._note = myarray[2]
            this._updateDate = myarray[3]
            this._favorite = myarray[4]
            this._recommendation = myarray[5]
            this._tag = myarray[6]
            this._user = myarray[7]
            this._game = myarray[8]
            return;
        }
        if (myarray.length === 7) {
            this._progress = myarray[0]
            this._note = myarray[1]
            this._favorite = myarray[2]
            this._recommendation = myarray[3]
            this._tag = myarray[4]
            this._user = myarray[5]
            this._game = myarray[6]
            return;
        }
        if (myarray.length === 3) {
            this._user = myarray[0]
            this._game = myarray[1]
            this._tag = myarray[2]
            return;
        }
    }

    static simpleRefract(registry: Registry) {
        const result = {
            id: registry!.id,
            progress: registry!.progress,
            note: registry!.note,
            updateDate: registry!.updateDate,
            favorite: registry!.favorite,
            recommendation: registry!.recommendation,
            tag: registry!.tag.id,
            user: registry!.user.id,
            game: registry!.game.id
        }
        return result;
    }

    public get id(): number | undefined {
        return this._id
    }
    public set id(value: number | undefined) {
        this._id = value
    }

    public get progress(): string | undefined {
        return this._progress
    }
    public set progress(value: string | undefined) {
        this._progress = value
    }

    public get favorite(): boolean | undefined {
        return this._favorite
    }
    public set favorite(value: boolean | undefined) {
        this._favorite = value
    }

    public get recommendation(): boolean | undefined {
        return this._recommendation
    }
    public set recommendation(value: boolean | undefined) {
        this._recommendation = value
    }

    get note(): string | undefined {
        return this._note
    }
    set note(value: string | undefined) {
        this._note = value
    }

    get updateDate(): string | undefined {
        return this._updateDate
    }
    set updateDate(value: string | undefined) {
        this._updateDate = value
    }

    get tag(): Tag {
        return this._tag
    }

    set tag(value: Tag) {
        this._tag = value
    }

    public get user(): User {
        return this._user
    }
    public set user(value: User) {
        this._user = value
    }

    public get game(): Game {
        return this._game
    }
    public set game(value: Game) {
        this._game = value
    }
}