export interface IUser {
  user: string;
  pwd: string;
  age: Date;
  marriageStatus: string;
  votes: IVoteUser[];
}

export interface IVoteUser {
  candidateId: number;
  inFavor: number;
  against: number;
}