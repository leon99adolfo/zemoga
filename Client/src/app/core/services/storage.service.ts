import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    // Constructor
    constructor(
    ) {
    }

    // Methods
    saveCurrentUser(userReg: User) {
        sessionStorage.setItem('currentUser', JSON.stringify(userReg));

        if (userReg.rememberMe) {
            localStorage.setItem('currentUser', JSON.stringify(userReg));
        }
    }

    getInfoUser(): User {
        let userReg = JSON.parse(sessionStorage.getItem('currentUser'));
        if (!userReg) {
            userReg = JSON.parse(localStorage.getItem('currentUser'));
            if (userReg) {
                sessionStorage.setItem('currentUser', JSON.stringify(userReg));
            }
        }
        return userReg;
    }


    cleanUserStorage() {
        // get session and local user
        let sessionUser: User = JSON.parse(sessionStorage.getItem('currentUser'));
        let localUser: User = JSON.parse(localStorage.getItem('currentUser'));
        // cleaning session user
        sessionStorage.removeItem('currentUser');
        if (sessionUser && localUser && sessionUser.user === localUser.user) {
            localStorage.removeItem('currentUser');
        }
        // cleaning grid searches
        sessionStorage.removeItem('gridSearches');
    }
}