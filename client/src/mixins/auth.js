import jwt from "jsonwebtoken";
import config from "../config";

export function isAuthenticated(token) {
    // We check if app runs with backend mode
    // if (!config.isBackend && token) return true;
    if (!token) return;
    const date = new Date().getTime() / 1000;
    const data = jwt.decode(token);
    if (!data) return;
    return date < data.exp;
}
export function rolAdmin() {
    return ( JSON.parse(localStorage.getItem('user')).rol === 'admin' )
}
export function rolUser() {
    return ( JSON.parse(localStorage.getItem('user')).rol === 'user' )
}

export const AuthMixin = {
    methods: {
        isAuthenticated,
        rolAdmin,
        rolUser
    }
};
