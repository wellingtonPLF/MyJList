import api from "./shared/services/_axiosConfig";
import { ErrorResult } from "./shared/interfaces/I_ErrorResult";
import authService from "./shared/services/authService";

interface Retry {
  count: number
  url: string | undefined
}

var retry : Retry = {
  count: 0,
  url: ''
};

export const registerRequestInterceptor = () => {
  return api.interceptors.request.use((request) => {
    if (retry.url == request.url) {
      retry.count += 1;
    }
    else {
      retry.url = request.url
    }
    return request;
  });
};

export const registerResponseInterceptor = () => {
  return api.interceptors.response.use((response) => {
    if (retry.count == 3) {
      retry.count = 0
      return Promise.reject("Error");
    }
    return response;
  }, 
  async (err) => {
    const error: ErrorResult<string> = err.response.data
    if(error.status == 401 && error.type === "EXPIRED_AT") {
      return authService.refreshToken().then(
        () => {
          return api.request(err.config);
        }
      ).catch((msg: any) => {
        if (msg.type != undefined){
          return authService.logOut().then(
            () => {
              return api.request(err.config);
            }
          ).catch((e) => {
            return Promise.reject(e.response.data);
          });
        }
        return Promise.reject(error);
      });
    }
    else {
      return Promise.reject(error);
    }
  });
}