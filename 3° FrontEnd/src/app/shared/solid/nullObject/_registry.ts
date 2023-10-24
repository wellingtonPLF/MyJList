import { GAME_INITIAL_STATE } from "./_game";
import { TAG_INITIAL_STATE } from "./_tag";
import { USER_INITIAL_STATE } from "./_user";

export const REGISTRY_INITIAL_STATE: any = {
    favorite: false,
    game: GAME_INITIAL_STATE,
    id: 0,
    note: undefined,
    progress: undefined,
    recommendation: false,
    tag: TAG_INITIAL_STATE,
    user: USER_INITIAL_STATE
}