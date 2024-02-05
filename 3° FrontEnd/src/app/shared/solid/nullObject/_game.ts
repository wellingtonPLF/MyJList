
const assetImage = `${import.meta.env.VITE_HTTP}./assets/images/console.png`

export const GAME_INITIAL_STATE: any = {
    id: 0,
    score: 0,
    name: "unknow",
    ranked: "",
    release: "unknow",
    premiede: "unknow",
    recommendation: 0,
    description: "Loading . . .",
    popularity: "unknow",
    playTime: 0.0,
    source: "unknow",
    status: ["unknow", "unknow"],
    network: ["unknow"],
    perspective: ["unknow"],
    languages: ["unknow", "unknow", "unknow"],
    gameType: undefined,
    plataform: [{value: undefined}],
    studio: [{value: undefined}],
    theme: [{value: undefined}],
    producer: [{value: undefined}],
    achievements: [{value: undefined}],
    gameImage: assetImage,
    imgs: [
      {value: assetImage},
      {value: assetImage},
      {value: assetImage},
      {value: assetImage},
      {value: assetImage}
    ]
}