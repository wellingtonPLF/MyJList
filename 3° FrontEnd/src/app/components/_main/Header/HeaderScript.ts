import { mapState, mapActions } from "vuex";
import { AUTH_INITIAL_STATE } from "../../../shared/vuex/reducer/authReducer";
import authService from "../../../shared/services/authService";

export default {
    name: 'HeaderComponent',
    computed: {
        ...mapState('authReducer', {
            userLogin: (state: any) => state.auth
        })
    },
    methods: {
        ...mapActions('authReducer', ['setAuth']),
        signOut(){
            this.setAuth(AUTH_INITIAL_STATE)
            authService.logOut().then(
                _ => {}
            )
        }
    }
}