import Container, { Service } from 'typedi';
import { IUser, IVoteUser } from '../interfaces/IUser';
import UserService from './userService';

@Service()
export default class CandidateService {
  
  // variables
  private _userService: UserService;
  private candidates: any[] = [
    { id: 1, name: "Kanye West"},
    { id: 2, name: "Mark Zuckerberg"},
    { id: 3, name: "Cristina Fernández de Kirchner"},
    { id: 4, name: "Malala Yousafzai"}
  ];

  constructor(){
    this._userService = Container.get(UserService);
  }

  vote(user: string, candidateId: number, isFavorVote: boolean): IUser {
    let objUser = this._userService.getUsers().find(u => u.user == user);
    if(objUser){
      if(!objUser.votes) objUser.votes = [];
      
      let objCand = objUser.votes.find(v => v.candidateId == candidateId);
      if(objCand){
        let totalVotesByCand: number = objCand.inFavor + objCand.against;
        if(totalVotesByCand < 3){
          if(isFavorVote) objCand.inFavor += 1;
          else objCand.against += 1;
        }
        else {
          throw new Error(`The user cannot vote more than 3 times for this candidate.`);
        }
      }
      else {
        let objVote: IVoteUser = {candidateId: candidateId, inFavor: 0, against: 0 };
        if(isFavorVote) objVote.inFavor += 1;
        else objVote.against += 1;
        // adding vote
        objUser.votes.push(objVote);
      } 
    }
    return objUser;
  }

  getVotesByUser(): any[]{
    let result: any[] = [];
    let allUsers = this._userService.getUsers();
    allUsers.forEach(u => {
      let rec = {user: u.user, votes: []};
      if(u.votes && u.votes.length > 0){
        u.votes.forEach(v => {
          let objCandidate = this.candidates.find(c => c.id == v.candidateId);
          let candVote = { candidateId: v.candidateId, name: objCandidate.name, votesInFavor: v.inFavor, votesAgainst: v.against };
          rec.votes.push(candVote);
        })
      }
      result.push(rec);
    });

    return result;
  }

}