import { defineStore } from 'pinia'
import {IUser} from "@/types/user";

interface IConfigState {
    userData: IUser | {}
}

export const useUser = defineStore('userData', {
    state: (): IConfigState => ({
        userData: {},
    }),
    actions: {
        setUser(userData: IUser) {
            this.userData = userData;
            localStorage.setItem('userData', JSON.stringify(userData));
        },
        clearUser() {
            this.userData = null;
            localStorage.removeItem('userData');
        },
    },
    getters: {
        isAuthenticated: (state) => !!state.userData?.email
    }
})