export class Tag {

    private _id?: number;
    private _value?: string;

    constructor(id: number, value: string);
    constructor(...myarray: any[]){
        if (myarray.length === 2) {
            this._id = myarray[0]
            this._value = myarray[1]
            return;
        }
    }

    static simpleRefract(tag: Tag | undefined) {
        let result:any = undefined
        if (tag != undefined){
            result = {
                id: tag!.id,
                value: tag!.value
            }
        }
        return result;
    }

    get id(): number | undefined{
        return this._id;
    }

    set id(id: number | undefined){
        this._id = id;
    }

    get value(): string | undefined{
        return this._value;
    }

    set value(value: string | undefined){
        this._value = value;
    }
}