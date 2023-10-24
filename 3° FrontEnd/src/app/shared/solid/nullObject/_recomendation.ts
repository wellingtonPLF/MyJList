import { GAME_INITIAL_STATE } from "./_game";
import { USER_INITIAL_STATE } from "./_user";

export const RECOMMENDATION_INITIAL_STATE = {
    id: 0,
    publication: 'xxxx-xx-xx',
    content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam iure aut rem delectus sunt accusantium nulla iste suscipit! Alias, dicta? Mollitia, quis necessitatibus consectetur dolor recusandae nihil unde fugiat ab?',
    game: GAME_INITIAL_STATE,
    user: USER_INITIAL_STATE,
    vote: undefined
  }