import { mapState, mapActions } from "vuex";
import authService from "../../../shared/services/authService";
import { USER_INITIAL_STATE } from "../../../shared/solid/nullObject/_user";

export default {
    name: 'HeaderComponent',
    data() {
        return {
            limit: false,
            status: true
        }
    },
    computed: {
        ...mapState('authReducer', {
            userLogin: (state: any) => state.auth
        })
    },
    methods: {
        ...mapActions('authReducer', ['setAuth']),
        signOut(){
            this.setAuth(USER_INITIAL_STATE)
            authService.logOut().then(
                _ => {}
            )
        },
        activateNotification() {
            // console.log("Activate Notification")
        }
    },
    mounted() {
        authService.limitSize().then(
            it => {
                if (it != undefined) {
                    this.status = false;
                    this.limit = it;
                }
            }
        )
    }
}