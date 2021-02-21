export class CandidateModel {
  name: string;
  time: string;
  topic: string;
  description: string;
  picture: string;
  inFavor: number;
  against: number;
  total: number;
  preVoteInFavor: boolean = true;
}
