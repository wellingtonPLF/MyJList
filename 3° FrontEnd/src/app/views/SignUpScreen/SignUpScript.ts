import { Auth } from "../../shared/models/Auth";
import { User } from "../../shared/models/User";
import authService from "../../shared/services/authService";
import nationalityService from "../../shared/services/nationalityService";
import userService from "../../shared/services/userService";
import GoBackComponent from "../../components/features/GoBack/GoBackComponent.vue"

const signUpComponent: any = {
    name: "SignUpComponent",
    components: {
      GoBackComponent
    },
    data() {
      return {
        user : { 
          username: undefined, 
          nickname: undefined,
          password: undefined,
          email: undefined,
          sexuality: undefined,
          nationality: undefined,
          bordDate: undefined
        },
        nationalitys: undefined,
        sexualitys: [{name: 'Masculine'} , {name: 'Feminine'}],
        value: undefined,
        count: 1,
        quantity: undefined,
        keys: undefined,
        error: { msg: undefined, enabled: false}
      };
    },
    beforeMount(){
      this.keys = Object.keys(this.user)
      this.quantity = this.keys.length
    },
    mounted(){
      nationalityService.listAll().then(
        (it: any) => {
          this.nationalitys = it;
        }
      )
    },
    methods: {
      typeInput() {
        if (this.keys[this.count - 1] == 'bordDate'){
          return 'date'
        }
        else if (this.keys[this.count - 1] == 'password'){
          return 'password'
        }
        return 'text' 
      },
      goBack() {
        if (this.$router.options.history.state.back == null) {
          this.$router.push("/")
        }
        else {
          this.$router.back()
        }
      },
      nextParam() {
        if (this.value != undefined && this.value !== '') {
          if (this.keys[this.count - 1] == 'password') {
            const special_regex = /(?=(.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\|/-]){3,})/
            const number_regex = /.*\d.*\d.*\d.*/
            const l_regex = /^(.*[a-zA-Z]){5,}.*$/
            if (!number_regex.test(this.value)){
              this.setErrorMessage("At least 3 numbers")
            }
            else if (!special_regex.test(this.value)){
              this.setErrorMessage("At least 3 special characters")
            }
            else if (!l_regex.test(this.value)){
              this.setErrorMessage("At least 5 letters")
            }
            else{
              this.change()
            }
            return
          }
          else if (this.keys[this.count - 1] == 'email') {
            const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
            if (!regex.test(this.value)) {
              this.setErrorMessage("Invalid Email")
            }
            else{
              this.change("default")
            }
            return
          }
          else if (this.keys[this.count - 1] == 'sexuality' || this.keys[this.count - 1] == 'nationality') {
            if (this.value == "default") {
              this.setErrorMessage("At least one value")
              return
            }
            else{
              if (this.keys[this.count - 1] == 'nationality'){
                this.change()
                return
              }
              this.change("default")
              return 
            }
          }
          else if (this.keys[this.count - 1] == 'bordDate') {
            const selected_date = new Date(this.value)
            const dateLimit = new Date(Date.now())
            dateLimit.setMonth(dateLimit.getMonth() - 1)
            if (selected_date.getTime() >= dateLimit.getTime()) {
              this.setErrorMessage("Date must be valid")
              return
            }       
            this.change()
            const auth: Auth = new Auth(this.user.email, this.user.username, this.user.password)
            authService.authInsert(auth).then(
              (it: any) => {

                const nationality = this.nationalitys.filter((obj: any) => {
                  if (obj.name == this.user.nationality){
                    return obj.id
                  }
                })
                const user: User = new User(this.user.nickname, this.user.bordDate, (this.user.sexuality == "Masculine") ? "M" : "F")
                user.auth = it.id
                user.nationality = nationality[0].id

                userService.insert(user).then(
                  _ => {
                    this.$router.push('/')
                  }
                )
              }
            )
            return
          }
          else if (this.value.length < 3) {
            this.setErrorMessage("At least 3 caracters")
            return
          }
          this.change()
        }
        else {
          this.setErrorMessage("No Feed on the Input")
        }
      },
      change(value: string){
        this.error.enabled = false
        this.user[this.keys[this.count - 1]] = this.value
        this.value = (value == undefined) ? undefined : value

        if (this.count < this.quantity){
          this.count += 1;
        }
      },
      setErrorMessage(msg: string){
        this.error.msg = msg;
        this.error.enabled = true
      }
    }
  };
  
  export default signUpComponent;
  