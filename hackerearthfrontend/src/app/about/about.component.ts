import { Component, OnInit } from '@angular/core';
import { Candidate, RegistrationType } from '../shared/candidate';
import {CandidateService} from '../services/candidate.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  candidate: Candidate;
  candidates: Candidate[];
  errMess: string;

  constructor(
    private candidateService: CandidateService
  ) { }

  ngOnInit() {
    this.candidateService.getCandidates()
    .subscribe(candidates => this.candidates = candidates,
      errmess => this.errMess = <any>errmess);
      console.log('hhi');
      setTimeout(() => {
        console.log(this.candidates.length);
      }, 5000 );
  }

}
