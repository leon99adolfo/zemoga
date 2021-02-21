import { Component, Input, OnInit } from '@angular/core';
import { CandidateModel } from 'app/core/models/candidate.model';

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
  // inputs
  @Input() set setCandidate(val: CandidateModel){
    this.candidate = val;
  }

  constructor() { }

  ngOnInit(): void {
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
    c.total += 1;
    if(c.preVoteInFavor) c.inFavor += 1;
    else c.against += 1;
  }

  public voteAgain(c: CandidateModel){
    this.voteMode = false;
  }
  

}
