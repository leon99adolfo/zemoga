export class CandidateModel {
  id: number;
  name: string;
  time: string;
  topic: string;
  description: string;
  picture: string;
  pictureSize: string;
  picturePosition: string;
  inFavor: number;
  against: number;
  total: number;
  preVoteInFavor: boolean = true;
}
