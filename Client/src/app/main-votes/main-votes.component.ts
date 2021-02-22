import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginUserComponent } from 'app/auth-pages/login-user/login-user.component';
import { UserService } from 'app/auth-pages/user.service';
import { CandidateModel } from 'app/core/models/candidate.model';
import { User } from 'app/core/models/user.model';
import { ApiService } from 'app/core/services/api.services';
import { MsgsService } from 'app/core/services/msgs.service';
import { StorageService } from 'app/core/services/storage.service';

@Component({
  selector: 'app-main-votes',
  templateUrl: './main-votes.component.html',
  styleUrls: ['./main-votes.component.scss']
})
export class MainVotesComponent implements OnInit {

  // variables
  public popeVote: boolean = true;
  public showNoteVotes: boolean = true;
  public candidates: CandidateModel[];
  public user: User;

  constructor(
    private _apiService: ApiService,
    private _storageService: StorageService,
    private _matDialog: MatDialog,
    private _msgsService: MsgsService,
    private _userService: UserService
  ) { }

  ngOnInit(): void {
    this._apiService.localGet("assets/data/candidates.json").subscribe(resp => this.candidates = resp);
    this._userService.obsObjUser.subscribe(resp => this.user = resp);
  }

  // methods
  logIn(){
    let config = { disableClose: false, width: '1000px', panelClass: 'custom-normal-dialog', data: {} };
    const dialogRef = this._matDialog.open(LoginUserComponent, config);
    dialogRef.afterClosed().subscribe();
  }

  logOut(){
    this._userService.loadObjUser(null);
    this._msgsService.showSuccess("Bye Bye!");
  }

}
