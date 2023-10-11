
export class Game {
    private _id?: number;
    private _score?: number;
    private _name?: string;
    private _playtime?: number;
    private _release?: string;
    private _premiede?: string;
    private _gameImage?: string;
    private _description?: string;
    private _theme?: any;
    private _studio?: any;
    private _producer?: any;
    private _status?: any;
    private _language?: any;
    private _gameType?: any;
    private _plataform?: any;
    private _perspective?: any;

    constructor(id: number, name: string);
    constructor(...myarray: any[]){
        if (myarray.length === 2) {
            this._id = myarray[0]
            this.name = myarray[1]
            return;
        }
    }

    static simpleRefract(game: Game) {
        const result = {
            id: game!.id,
            score: game!.score,
            name: game!.name,
            playtime: game!.playtime,
            release: game!.release,
            premiede: game!.premiede,
            gameImage: game!.gameImage,
            description: game!.description,
            theme: game!.theme,
            studio: game!.studio,
            producer: game!.producer,
            status: game!.status,
            language: game!.language,
            gameType: game!.gameType,
            plataform: game!.plataform,
            perspective: game!.perspective
        }
        return result;
    }

    get id(): number | undefined{
        return this._id;
    }

    set id(id: number | undefined){
        this._id = id;
    }

    get score() : number | undefined {
        return this._score;
    }

    set score(score : number | undefined) {
        this._score = score;
    }

    get name() : string | undefined {
        return this._name;
    }

    set name(name : string | undefined) {
        this._name = name;
    }

    get playtime() : number | undefined {
        return this._playtime;
    }

    set playtime(playtime: number | undefined) {
        this._playtime = playtime;
    }

    get release() : string | undefined {
        return this._release;
    }

    set release(release: string | undefined) {
        this._release = release;
    }

    get premiede() : string | undefined {
        return this._premiede;
    }

    set premiede(premiede: string | undefined) {
        this._premiede = premiede;
    }

    get gameImage() : string | undefined {
        return this._gameImage;
    }

    set gameImage(gameImage: string | undefined) {
        this._gameImage = gameImage;
    }

    get description() : string | undefined {
        return this._description;
    }

    set description(description: string | undefined) {
        this._description = description;
    }

    get theme() : any | undefined {
        return this._theme;
    }

    set theme(theme: any | undefined) {
        this._theme = theme;
    }

    get studio() : any | undefined {
        return this._studio;
    }

    set studio(studio: any | undefined) {
        this._studio = studio;
    }

    get producer() : any | undefined {
        return this._producer;
    }

    set producer(producer: any | undefined) {
        this._producer = producer;
    }

    get status() : any | undefined {
        return this._status;
    }

    set status(status: any | undefined) {
        this._status = status;
    }

    get language() : any | undefined {
        return this._language;
    }

    set language(language: any | undefined) {
        this._language = language;
    }

    get gameType() : any | undefined {
        return this._gameType;
    }

    set gameType(gameType: any | undefined) {
        this._gameType = gameType;
    }

    get plataform() : any | undefined {
        return this._plataform;
    }

    set plataform(plataform: any | undefined) {
        this._plataform = plataform;
    }

    get perspective() : any | undefined {
        return this._perspective;
    }

    set perspective(perspective: any | undefined) {
        this._perspective = perspective;
    }
}