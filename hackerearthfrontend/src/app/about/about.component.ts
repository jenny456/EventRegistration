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
  countSelf = 0;
  countGroup = 0;
  countCorporate = 0;
  countOther = 0;

  constructor(
    private candidateService: CandidateService
  ) { }

  ngOnInit() {
    this.candidateService.getCandidates()
    .subscribe(candidates => this.candidates = candidates,
      errmess => this.errMess = <any>errmess)
      .add(() => {
        this.countSelf = 0;
        this.countGroup = 0;
        this.countCorporate = 0;
        this.countOther = 0;
        for ( let i = 0; i < this.candidates.length; i++) {
          // console.log(this.candidates[i].registrationtype);
          if (this.candidates[i].registrationtype === 'Self') {
              this.countSelf = this.countSelf + 1;
          } else
          if (this.candidates[i].registrationtype === 'Group') {
            this.countGroup = this.countGroup + 1;
          } else
          if (this.candidates[i].registrationtype === 'Corporate') {
            this.countCorporate = this.countCorporate + 1;
          } else
          if (this.candidates[i].registrationtype === 'Other') {
            this.countOther = this.countOther + 1;
          }
        }
        console.log(this.countSelf);
        console.log(this.countGroup);
        console.log(this.countCorporate);
        console.log(this.countOther);
      });
  }

}
