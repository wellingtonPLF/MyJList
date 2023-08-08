const filterComponent: any = {
  name: 'FilterComponent',
  data() {
    return {
      showFilter: true,
      typeOfGames: [
        "ANY", "RPG", "SHOOTER", "MMORPG", "RACE", "DANCE",
        "PUZZLE", "OPEN WORLD", "SURVIVAL", "SPORTS", "ADVENTURE",
        "STRATEGY", "PLATAFORM", "FIGHTHING", "MOBA",
        "SIMULATION", "ARCADE", "EDUCATIONAL", "CARD",
        "BATTLE ROYALE", "TURN BASED", "POINT AND CLICK",
        "MUSIC", "STEALTH", "SHOOT 'EM UP", "TEXT", "CASUAL"
      ],
      studios: [
        "Tencent", "Epic Games", "Blizzard", "Nintendo", "Microsoft", "Sony", "Other"
      ]
    };
  },
  methods: {
    show() {
      this.showFilter = !this.showFilter
    }
  },
  mounted() { },
};

export default filterComponent;
