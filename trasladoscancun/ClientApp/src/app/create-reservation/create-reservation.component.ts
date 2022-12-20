import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from '../home/Ticket';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import { Schedule } from './Schedule';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./reservation.css']
})
export class CreateReservationComponent implements OnInit {
  ticket: Ticket = new Ticket();
  form!: FormGroup;
  typeSelected: string;
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,public datepipe: DatePipe,
  public activatedRoute: ActivatedRoute, private _router: Router,private spinnerService: NgxSpinnerService) {
    this.typeSelected = 'ball-fussion';
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.ticket.dateFrom = params.dateFrom;
      this.ticket.dateTo = params.dateTo;
      if(params.dateTo != null && params.dateTo != ""){
        this.ticket.to = params.to + " Desde: " + params.from + " Fecha: " + this.datepipe.transform(params.dateTo, 'yyyy-MM-dd');
        this.ticket.from = params.from + " Hacia: " + params.to + " Fecha: " + this.datepipe.transform(this.ticket.dateFrom, 'yyyy-MM-dd');
        this.ticket.price = (params.price * 2) - (params.price * 0.20);
      }
      else {
        this.ticket.to = params.to;
        this.ticket.from = params.from;
        this.ticket.price = params.price;
      }
      
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
    this.spinnerService.show();
    this.form.value.price = this.ticket.price;
    this.form.value.from = this.ticket.from;
    this.form.value.to = this.ticket.to;
    this.form.value.drivername = "Mario Rosas";
    this.form.value.dateSchedule = (moment(this.ticket.dateFrom)).format('YYYY-MM-DDTHH:mm:ss');
    this.form.value.schedule = (moment(this.ticket.dateFrom)).format('YYYY-MM-DDTHH:mm:ss');
      this.http.post<Schedule>(this.baseUrl + 'schedule', this.form.value).subscribe({
      next: () => {this.form.reset();this._router.navigate(['']); this.spinnerService.hide();},
      error: () => {alert("Ocurrio un problema"); this.spinnerService.hide();}
    })
  }
  
}


