import HeaderComponent from "./../../components/_main/Header/HeaderComponent.vue";
import axios, { AxiosResponse } from "axios";

interface Game {
  id: number;
  img: string;
  name: string;
  plataforms: string[];
  user: string;
  date: string;
  description: string;
}

const homeComponent: any = {
  name: "SignInPage",
  components: {
    HeaderComponent,
  },
  data() {
    return {
      games: [] as Game[],
      recomendations: [] as Game[],
      options: [
        {icon: "gamepad", name: "Games"}, 
        {icon: "video", name: "Trailers"}, 
        {icon: "user", name: "Users"}, 
        {icon: "hand-holding-heart", name: "Premium"}, 
        {icon: "building", name: "Industry"}, 
        {icon: "headset", name: "Suport"}, 
        {icon: "file-lines", name: "About"}
      ],
      toprank: [
        'https://blogger.googleusercontent.com/img/a/AVvXsEj8U_oBrYVXCCbByrpLObCqqyZ43CJstVfEA5JcrjwElsS3-zIQ_RZoy7oCljBuhGdwp9KJ-dz3w605EUY7vuLL9uebvOxJ_o0-KztvO-NxHq23KvrzYPFv6lB1KLA_ecCYCu6hWTTmi12fzezJr03jyViEqXfJnT6gaNCYtbf3ed14rBc3kNo5QMlyaQ=w640-h400',
        'https://www.zazoom.eu/comunedieboli/2420,313AvOAxGV76p572k4e2ipO74wLGd74d7otC68mzsWi80rj4CPPNU909fyxJOSG.jpg',
        'https://image-cdn.essentiallysports.com/wp-content/uploads/20200702170542/Call-of-Duty-Modern-Warfare-720-740x416.jpg',
        'https://cdn.akamai.steamstatic.com/steam/apps/1313140/header_schinese.jpg?t=1686863929'
      ]
    };
  },
  mounted() {
    axios
      .get("jsons/games.json")
      .then((it: AxiosResponse<Game[]>) => {
        this.games = it.data.slice(0, 6);
        this.recomendations = it.data.slice(6, 10);
      })
      .catch((error) => {
        console.error(error);
      });
  },
};

export default homeComponent;
