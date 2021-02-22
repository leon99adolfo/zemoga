import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'app/core/models/user.model';
import { UserService } from 'app/auth-pages/user.service';
import { takeUntil } from 'rxjs/operators';
import { StorageService } from 'app/core/services/storage.service';
import { ReplaySubject } from 'rxjs';
import { RegisterUserComponent } from '../register-user/register-user.component';
import { MsgsService } from 'app/core/services/msgs.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss']
})
export class LoginUserComponent implements OnInit, OnDestroy {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  // variables
  user: User = new User;
  
  // Contructor
  constructor(
    public _matDialogRef: MatDialogRef<LoginUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _matDialog: MatDialog,
    private _userService: UserService,
    private _storageService: StorageService,
    private _msgsService: MsgsService
  ) {
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
        this._userService.login({user: this.user.user, pwd: this.user.pwd}).pipe(takeUntil(this.destroyed$)).subscribe(
          resp => {
            let userReg: User = resp;
            userReg.rememberMe = this.user.rememberMe;
            this._userService.loadObjUser(this.user);
            this._msgsService.showSuccess("Welcome!");
            this._matDialogRef.close({response: true});
          },
          error => {
            this._msgsService.showErrorResp(error.error);
          }
        );
      }
      else{
        this._msgsService.showError("invalid data");
      }
    }
  }

  close(){
    this._matDialogRef.close({response: false});
  }


  register(){
    let config = { disableClose: false, width: '1000px', panelClass: 'custom-normal-dialog', data: {} };
    const dialogRef = this._matDialog.open(RegisterUserComponent, config);
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.response) {
        this._matDialogRef.close({response: true});
      }
    });
  }

}
