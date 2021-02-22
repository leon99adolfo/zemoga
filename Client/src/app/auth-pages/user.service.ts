import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'app/core/models/user.model';
import { ApiService } from 'app/core/services/api.services';
import { StorageService } from 'app/core/services/storage.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // variables
  private readonly URL = 'api/auth';
  private objUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  public obsObjUser: Observable<User> = this.objUser.asObservable();


  constructor(
    private _apiService: ApiService,
    private _storageService: StorageService
  ) { }
  
  loadObjUser(val: User) {
    if(val) this._storageService.saveCurrentUser(val);
    else this._storageService.cleanUserStorage();

    this.objUser.next(val);
  }
  
  login(objParam): Observable<any> {
    return this._apiService.apiPost(`${this.URL}/login`, objParam);
  }

  register(objParam): Observable<any> {
    return this._apiService.apiPost(`${this.URL}/register`, objParam);
  }
  
}
