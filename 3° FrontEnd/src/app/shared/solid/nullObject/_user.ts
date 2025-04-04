import { fullUrl } from "@utils/general.util"

const assetImage = `${fullUrl}/assets/images/lastUpdate.png`
export const assetUser = `${fullUrl}/assets/images/userImage.png`

export const USER_INITIAL_STATE: any = {
    id: 0,
    note: '',
    nickname: "unknow",
    status: "unknow",
    joined: "--/--/--",
    sexuality: "M",
    friend: [],
    bornDate: "--/--/--",
    auth: 0,
    playing: 0,
    onHold: 0,
    planning: 0,
    dropped: 0,
    completed: 0,
    email: 'unknow',
    replayed: 0,
    hours: 0,
    userImage: assetUser,
    role: [{
       id: 0, roleName: ''
    }],
    favoriteGames: [
      { 
        id: 0, 
        game: { id: 0, gameImage: assetImage}
      },
      { 
        id: 0, 
        game: { id: 0, gameImage: assetImage}
      },
      { 
        id: 0, 
        game: { id: 0, gameImage: assetImage}
      },
      { 
        id: 0, 
        game: { id: 0, gameImage: assetImage}
      }
    ],
    lastUpdated: [
      { 
        id: 0, 
        game: { id: 0, gameImage: assetImage}
      },
      { 
        id: 0, 
        game: { id: 0, gameImage: assetImage}
      },
      { 
        id: 0, 
        game: { id: 0, gameImage: assetImage}
      },
      { 
        id: 0, 
        game: { id: 0, gameImage: assetImage}
      }
    ],
    link: [],
    nationality: { name: "Brazil", cod: "BR"},
    recommendations: 0
  }