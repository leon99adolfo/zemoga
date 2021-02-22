import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'app/auth-pages/user.service';
import { CandidateModel } from 'app/core/models/candidate.model';
import { User } from 'app/core/models/user.model';
import { MsgsService } from 'app/core/services/msgs.service';
import { VotesService } from 'app/main-votes/votes.service';

@Component({
  selector: 'app-vote-candidate',
  templateUrl: './vote-candidate.component.html',
  styleUrls: ['./vote-candidate.component.scss']
})
export class VoteCandidateComponent implements OnInit {

  // variables
  candidate: CandidateModel;
  strBackImg: string;
  voteMode: boolean = false;
  user: User;
  // inputs
  @Input() set setCandidate(val: CandidateModel){
    this.candidate = val;
  }

  constructor(
    private _userService: UserService,
    private _votesService: VotesService,
    private _msgsService: MsgsService
  ) { }

  ngOnInit(): void {
    this._userService.obsObjUser.subscribe(resp => this.user = resp);
  }

  // methods
  public setStrBackImg(c: CandidateModel): string{
    let result: string= "";
    result = `url('${c.picture}')`;
    return result;
  }

  public getInfavorPerc(c: CandidateModel): number{
    let result = 0;
    result = c.total == 0 ? 50 : Math.round((c.inFavor/c.total) * 100);
    return result;
  }

  public getAgainstPerc(c: CandidateModel): number{
    let result = 0;
    result = Math.abs(this.getInfavorPerc(c) - 100);
    return result;
  }

  public voteNow(c: CandidateModel){
    this.voteMode = true;
    this._votesService.newVote({user: this.user.user, candidateId: c.id, isFavorVote: c.preVoteInFavor}).subscribe(
      res => {
        this._userService.loadObjUser(res);
        if(res){
          c.total += 1;
          if(c.preVoteInFavor) c.inFavor += 1;
          else c.against += 1;
        }
      },
      e => this._msgsService.showErrorResp(e.error)
    );
  }

  public voteAgain(c: CandidateModel){
    this.voteMode = false;
  }
  
  canVote(c: CandidateModel): boolean{
    let result: boolean = false;
    if(this.user){
      if(this.user.votes){
        let objVotes = this.user.votes.find(v => v.candidateId == c.id);
        if(objVotes){
          let totalByCand = objVotes.inFavor + objVotes.against;
          if(totalByCand < 3) result = true;
        }
        else result = true;
      }
      else result = true;
    }
    return result;
  }

}
