export class Role {

    private _id?: number;
    private _roleName?: string;

    constructor(id: number, roleName: string);
    constructor(...myarray: any[]){
        if (myarray.length === 2) {
            this._id = myarray[0]
            this._roleName = myarray[1]
            return;
        }
    }

    static refract(role: Role) {
        const result = {
            id: role!.id,
            roleName: role!.roleName
        }
        return result;
    }

    get id(): number | undefined{
        return this._id;
    }

    set id(id: number | undefined){
        this._id = id;
    }

    get roleName(): string | undefined{
        return this._roleName;
    }

    set roleName(roleName: string | undefined){
        this._roleName = roleName;
    }
}