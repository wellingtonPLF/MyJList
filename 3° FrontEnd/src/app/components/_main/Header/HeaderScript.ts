import { mapState, mapActions } from "vuex";
import { USER_INITIAL_STATE } from "../../../shared/vuex/reducer/authReducer";

export default {
    name: 'HeaderComponent',
    computed: {
        ...mapState('authReducer', {
            userLogin: (state: any) => state.user
        })
    },
    methods: {
        ...mapActions('authReducer', ['setUser']),
        signOut(){
            this.setUser(USER_INITIAL_STATE)
        }
    }
}