import { protocol } from "@services/_axiosConfig";
import GoBackComponent from "../../components/features/GoBack/GoBackComponent.vue"
import LocalStorageUtil from "@utils/localStorage.util"


const accessComponent: any = {
  name: "AccessComponent",
  components: {
    GoBackComponent
  },
  data() {
    return {
      hostname: ''
    };
  },
  methods: {
    changeAccess(): void {
      if (this.hostname) {
        if (this.hostname != '' && this.hostname.includes(protocol)) {
            const lastValue = this.hostname.charAt(this.hostname.length - 1)
            if (lastValue == "/") {
                LocalStorageUtil.setToken('backendHostname', this.hostname.slice(0, this.hostname.length - 1))
            }
            LocalStorageUtil.setToken('backendHostname', this.hostname)
        }
      }
    }
  }
};

export default accessComponent;
