import { Inject, OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'app/core/models/user.model';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoginUserComponent } from '../login-user/login-user.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit, OnDestroy {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  // variables
  user: User = new User;
  
  // Contructor
  constructor(
    public _matDialogRef: MatDialogRef<LoginUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _userService: UserService  ) {
  }

  // Events
  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  // Methods
  save(){
    if(this.user){
      if(this.user.user && this.user.user.length > 4 && this.user.pwd && this.user.pwd.length > 4){

        this._userService.register(this.user).pipe(takeUntil(this.destroyed$)).subscribe(
          () => {
            this._userService.loadObjUser(this.user);
            this._matDialogRef.close({response: true});
          },
          error => {
            console.log(error);
          }
        );
      }
      else{
        console.log("invalid data");
      }
    }
  }

  close(){
    this._matDialogRef.close({response: false});
  }

}
