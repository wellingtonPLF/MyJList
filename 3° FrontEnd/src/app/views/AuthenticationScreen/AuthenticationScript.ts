import SignInComponent from "../../components/_main/SignIn/SignInComponent.vue";
import SignOnComponent from "../../components/_main/SignOn/SignOnComponent.vue";

const authenticationComponent: any = {
    name: 'AuthenticationComponent',
    components: {
        SignInComponent,
        SignOnComponent
    },
    data() {
      return {};
    },
    mounted() {},
  };
  
  export default authenticationComponent;
  