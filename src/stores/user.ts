import { defineStore } from 'pinia'
import {IUser} from "@/types/user";

interface IConfigState {
    userData: IUser | null
}

export const useUser = defineStore('userData', {
    state: (): IConfigState => {
        const userDataFromStorage = localStorage.getItem('userData');
        const initialUserData = userDataFromStorage
            ? JSON.parse(userDataFromStorage)
            : {};

        return {
            userData: initialUserData,
        }
    },
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