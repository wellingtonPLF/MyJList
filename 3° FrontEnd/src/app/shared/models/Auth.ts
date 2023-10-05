import { Role } from "./Role";

export class Auth{

    private _id?: number;
    private _email?: string;
    private _username?: string;
    private _password?: string;
    private _roles?: Array<Role> = [new Role(1, "ROLE_USER")]

    constructor(id: number, email: string, username: string, password: string);
    constructor();
    constructor(email: string | undefined, username: string | undefined, password: string);
    constructor(...myarray: any[]) {
        if (myarray.length === 3) {
            this._email = myarray[0]
            this._username = myarray[1]
            this._password = myarray[2]
            return;
        }
        if (myarray.length === 4) {
            this._id = myarray[0]
            this._email = myarray[1]
            this._username = myarray[2]
            this._password = myarray[3]
            return;
        }
    }

    static refract(auth: Auth | undefined) {
        const result = {
            id: auth!.id, 
            email: auth!.email, 
            username: auth!.username,
            password: auth!.password,
            roles: auth!.roles?.map((role) => Role.refract(role))
        }
        return result;
    }

    get id(): number | undefined {
        return this._id;
    }

    set id(id: number | undefined) {
        this._id = id;
    }

    get email(): string | undefined {
        return this._email;
    }

    set email(email: string | undefined) {
        this._email = email;
    }

    get username(): string | undefined {
        return this._username;
    }

    set username(username: string | undefined) {
        this._username = username;
    }

    get password(): string | undefined {
        return this._password;
    }

    set password(password: string | undefined) {
        this._password = password;
    }

    get roles(): Array<Role> | undefined{
        return this._roles;
    }

    set roles(roles: Array<Role> | undefined) {
        this._roles = roles;
    }
}