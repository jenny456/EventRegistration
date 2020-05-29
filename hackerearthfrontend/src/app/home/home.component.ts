import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import {  RegisterformComponent } from '../registerform/registerform.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  openRegistrationForm() {
    this.dialog.open(RegisterformComponent, { width: '800px', height: '700px'});
  }

}
