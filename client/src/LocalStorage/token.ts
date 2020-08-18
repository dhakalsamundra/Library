import axios from 'axios'

export const setAuthorizationHeader = (token: string) => {
    if(!localStorage.getItem("signInToken") || token !== localStorage.getItem("signInToken")){
        const signInToken = `Bearer ${token}`
        localStorage.setItem("signInToken", signInToken)
        axios.defaults.headers.common["Authorization"] = signInToken

    } else {
        axios.defaults.headers.common["Authorization"] = token
    }
}