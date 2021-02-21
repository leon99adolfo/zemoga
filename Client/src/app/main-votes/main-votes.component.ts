import { Component, OnInit } from '@angular/core';
import { CandidateModel } from 'app/core/models/candidate.model';

@Component({
  selector: 'app-main-votes',
  templateUrl: './main-votes.component.html',
  styleUrls: ['./main-votes.component.scss']
})
export class MainVotesComponent implements OnInit {

  // variables
  public popeVote: boolean = true;
  public showNoteVotes: boolean = true;
  public candidates: CandidateModel[] = [
    {
      name: "Kanye West",
      time: "1 Month ago",
      topic: "Entertainment",
      description: "Vestibulum diam ante, porttitor a odio eget, rhoncus neque. Aenean eu velit libero",
      picture: "/assets/imgs/kanyeWest.jpg",
      inFavor: 10,
      against: 90,
      total: 100,
      preVoteInFavor: true
    },
    {
      name: "Mark Zuckerberg",
      time: "1 Month ago",
      topic: "Business",
      description: "Vestibulum diam ante, porttitor a odio eget, rhoncus neque. Aenean eu velit libero",
      picture: "/assets/imgs/Mark.jpg",
      inFavor: 36,
      against: 64,
      total: 100,
      preVoteInFavor: true
    },
    {
      name: "Cristina Fernández de Kirchner",
      time: "1 Month ago",
      topic: "Politics",
      description: "Vestibulum diam ante, porttitor a odio eget, rhoncus neque. Aenean eu velit libero",
      picture: "/assets/imgs/Cristina.jpg",
      inFavor: 36,
      against: 64,
      total: 100,
      preVoteInFavor: true
    },
    {
      name: "Malala Yousafzai",
      time: "1 Month ago",
      topic: "Entertainment",
      description: "Vestibulum diam ante, porttitor a odio eget, rhoncus neque. Aenean eu velit libero",
      picture: "/assets/imgs/Malala.jpg",
      inFavor: 64,
      against: 36,
      total: 100,
      preVoteInFavor: true
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
