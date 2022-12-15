import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from '../home/Ticket';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import { Schedule } from './Schedule';
import * as moment from 'moment';

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./reservation.css']
})
export class CreateReservationComponent implements OnInit {
  ticket: Ticket = new Ticket();
  form!: FormGroup;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
  public activatedRoute: ActivatedRoute, private _router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.ticket.from = params.from;
      this.ticket.to = params.to;
      this.ticket.price = params.price;
      this.ticket.dateFrom = params.dateFrom;
    });

    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
      clientname: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required)
    });
  }

  get f(){
    return this.form.controls;
  }

  onSubmitTemplateBased(){
    this.form.value.price = this.ticket.price;
    this.form.value.from = this.ticket.from;
    this.form.value.to = this.ticket.to;
    this.form.value.drivername = "Mario Rosas";
    this.form.value.dateSchedule = (moment(this.ticket.dateFrom)).format('YYYY-MM-DDTHH:mm:ss');
    this.form.value.schedule = (moment(this.ticket.dateFrom)).format('YYYY-MM-DDTHH:mm:ss');
      this.http.post<Schedule>(this.baseUrl + 'schedule', this.form.value).subscribe({
      next: () => {this.form.reset();this._router.navigate([''])}
    })
  }
  
}


