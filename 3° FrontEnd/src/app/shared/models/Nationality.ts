export class Nationality {

    private _id?: number;
    private _cod?: string;
    private _name?: string;

    constructor(id: number, cod: string, name: string);
    constructor(...myarray: any[]){
        if (myarray.length === 3) {
            this._id = myarray[0]
            this._cod = myarray[1]
            this._name = myarray[2]
            return;
        }
    }

    static simpleRefract(nationality: Nationality) {
        const result = {
            id: nationality!.id,
            cod: nationality!.cod,
            name: nationality!.name
        }
        return result;
    }

    get id(): number | undefined{
        return this._id;
    }

    set id(id: number | undefined){
        this._id = id;
    }

    get cod(): string | undefined{
        return this._cod;
    }

    set cod(cod: string | undefined){
        this._cod = cod;
    }

    get name(): string | undefined{
        return this._name;
    }

    set name(name: string | undefined){
        this._name = name;
    }
}