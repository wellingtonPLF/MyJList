import { I_User } from "../interfaces/I_User";

export class User implements I_User {
    private _id?: number;
    private _nickName?: string;
    private _bornDate?: string;
    private _auth?: number;

    constructor(id:number, nickName: string, bornDate: string);
    constructor(nickName: string, bornDate: string);
    constructor();
    constructor(...myarray: any[]){
        if (myarray.length === 2) {
            this._nickName = myarray[0]
            this._bornDate = myarray[1]
            return;
        }
        if (myarray.length === 3) {
            this._id = myarray[0]
            this._nickName = myarray[1]
            this._bornDate = myarray[2]
            return;
        }
    }

    static simpleRefract(user: User) {
        const result = { 
          id: user.id,  
          nickname: user.nickName, 
          bornDate: user.bornDate,
          auth_id: user.auth
        }
        return result;
    }

    get id(): number | undefined{
        return this._id;
    }

    set id(id: number | undefined){
        this._id = id;
    }

    get nickName(): string | undefined{
        return this._nickName;
    }

    set nickName(nickName: string | undefined){
        this._nickName = nickName;
    }

    get bornDate(): string | undefined{
        return this._bornDate;
    }

    set bornDate(bornDate: string | undefined){
        this._bornDate = bornDate;
    }

    get auth(): number | undefined{
        return this._auth;
    }

    set auth(auth: number | undefined){
        this._auth = auth;
    }
}