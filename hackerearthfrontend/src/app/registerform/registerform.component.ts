import {MatDialog, MatDialogRef} from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Candidate, RegistrationType } from '../shared/candidate';
import {CandidateService} from '../services/candidate.service';
@Component({
  selector: 'app-registerform',
  templateUrl: './registerform.component.html',
  styleUrls: ['./registerform.component.scss']
})
export class RegisterformComponent implements OnInit {
  @ViewChild('fform') registerFormDirective;
  registerForm: FormGroup;
  candidate: Candidate;
  candidates: Candidate[];
  selectedCandidate: Candidate;
  errMess: string;
  submitted = null;
  showForm = true;
  registerationType = RegistrationType;

  formErrors = {
    'name' : '',
    'mobile': '',
    'email' : '',
    'registrationtype': '',
    'numtickets' : ''
  };
  validationMessages = {
    'name': {
      'required':      'Name is required.',
      'minlength':     'Name must be at least 2 characters long.',
      'maxlength':     'Name cannot be more than 25 characters long.'
    },
    'mobile': {
      'required':      'Mobile number is required.',
      'pattern':       'Mobile number must contain only numbers.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
    'registrationtype' : {
      'required': 'Registration Type is required.'
    },
    'numtickets' : {
      'required' : 'Number of Tickets is required.'
    }
  };

  constructor(private fb: FormBuilder,
    private candidateService: CandidateService) {}
    // @Inject('baseURL') public baseURL) {
    // this.createForm();
  // }



  createForm() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required , Validators.minLength(2), Validators.maxLength(25)]],
      mobile: ['', [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      registrationtype: ['', Validators.required],
      numtickets: ['1', Validators.required]
    });
    this.registerForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }
  onValueChanged( data?: any) {
    if (!this.registerForm) {return; }
    const form = this.registerForm;
    for (const field in this.formErrors) {
      if ( this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
            const messages = this.validationMessages[field];
            for ( const key in control.errors) {
              if ( control.errors.hasOwnProperty(key)) {
                this.formErrors[field] += messages[key] + '';
              }
            }
        }
      }
    }
  }

  ngOnInit() {
    this.createForm();
    this.candidateService.getCandidates()
    .subscribe(candidates => this.candidates = candidates,
      errmess => this.errMess = <any>errmess);
      console.log('hhi');
      setTimeout(() => {
        console.log(this.candidates.length);
      }, 5000 );
  }
  onSubmit() {
    this.candidate = this.registerForm.value;
    console.log(this.candidate);
    this.showForm = false;
    this.candidateService.submitCandidate(this.candidate)
      .subscribe(candidate => {
        this.submitted = candidate;
        this.candidate = null;
         setTimeout(() => { this.submitted = null; this.showForm = true; }, 10000);
      }, error => console.log(error.status, error.message));
    // console.log(this.candidates);
    this.registerForm.reset({
      name: '',
      mobile: '',
      email: '',
      registrationtype: 'Self',
      numtickets: '1'
    });
    // this.registerForm.reset();
    this.registerFormDirective.resetForm();
  }
}
