import { Component } from '@angular/core';
import { UserService } from './auth-pages/user.service';
import { StorageService } from './core/services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private _userService: UserService,
    private _storageService: StorageService
  ) { 
    // first load
    this._userService.loadObjUser(this._storageService.getInfoUser());
  }
  
}
