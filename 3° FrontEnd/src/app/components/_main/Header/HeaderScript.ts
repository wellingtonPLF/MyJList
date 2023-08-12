import { mapState } from "vuex";

export default {
    name: 'HeaderComponent',
    computed: {
        ...mapState('authReducer', {
            userLogin: (state: any) => state.user
        })
    }
}