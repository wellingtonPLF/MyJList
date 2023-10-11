// import { I_User } from "../interfaces/I_User";
import { Nationality } from "./Nationality";

export class User {
    private _id?: number;
    private _nickname?: string;
    private _bornDate?: string;
    private _sexuality?: string;
    private _joined?: string;
    private _note?: string;
    private _status?: string;
    private _userImage?: string;
    private _nationality?: Nationality;
    private _auth?: number;
    private _friend?: any;

    constructor(id:number, nickname: string, bornDate: string, sexuality: string);
    constructor(nickname: string, bornDate: string, sexuality: string);
    constructor();
    constructor(...myarray: any[]){
        if (myarray.length === 3) {
            this._nickname = myarray[0]
            this._bornDate = myarray[1]
            this._sexuality = myarray[2]
            return;
        }
        if (myarray.length === 4) {
            this._id = myarray[0]
            this._nickname = myarray[1]
            this._bornDate = myarray[2]
            this._sexuality = myarray[3]
            return;
        }
    }

    static simpleRefract(user: User) {
        const result = { 
          id: user.id,  
          nickname: user.nickname, 
          bornDate: user.bornDate,
          sexuality: user.sexuality,
          nationality: user.nationality,
          auth: user.auth
        }
        return result;
    }

    get id(): number | undefined{
        return this._id;
    }

    set id(id: number | undefined){
        this._id = id;
    }

    get nickname(): string | undefined{
        return this._nickname;
    }

    set nickname(nickname: string | undefined){
        this._nickname = nickname;
    }

    get bornDate(): string | undefined{
        return this._bornDate;
    }

    set bornDate(bornDate: string | undefined){
        this._bornDate = bornDate;
    }

    get sexuality(): string | undefined{
        return this._sexuality;
    }

    set sexuality(sexuality: string | undefined){
        this._sexuality = sexuality;
    }

    get joined() : string | undefined {
        return this._joined;
      }
    
      set joined(value : string | undefined) {
        this._joined = value;
      }
    
      get note() : string | undefined {
        return this._note;
      }
    
      set note(value : string | undefined) {
        this._note = value;
      }
    
      get status() : string | undefined {
        return this._status;
      }
    
      set status(value : string | undefined) {
        this._status = value;
      }
    
      get userImage() : string | undefined {
        return this._userImage;
      }
    
      set userImage(value : string | undefined) {
        this._userImage = value;
      }

    get nationality(): Nationality | undefined{
        return this._nationality;
    }

    set nationality(nationality: Nationality | undefined){
        this._nationality = nationality;
    }

    get auth(): number | undefined{
        return this._auth;
    }

    set auth(auth: number | undefined){
        this._auth = auth;
    }

    get friend(): number | undefined{
        return this._friend;
    }

    set friend(friend: number | undefined){
        this._friend = friend;
    }
}