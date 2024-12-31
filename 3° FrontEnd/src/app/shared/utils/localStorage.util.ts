
export class LocalStorageUtil {

    getToken(tokenName: string) {
        return localStorage.getItem(tokenName)
    }

    setToken(tokenName: string, token: string) {
        localStorage.setItem(tokenName, token)
        console.log('Token Add')
    }

    removeToken(tokenName: string) {
        localStorage.removeItem(tokenName)
        localStorage.clear()
        console.log('Token Removido')
    }
    
}

export default new LocalStorageUtil()
